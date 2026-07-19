import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { UserProfile } from '../../../shared/types'

interface AuthState {
  user: UserProfile | null
  loading: boolean
  error: string | null
  login: (login: string, password: string, remember: boolean) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window.anisav === 'undefined') {
      // No preload bridge (e.g. plain browser dev preview) — behave as logged out.
      setLoading(false)
      return
    }
    window.anisav
      .loadSavedSession()
      .then((profile) => setUser(profile))
      .finally(() => setLoading(false))
  }, [])

  async function login(loginValue: string, password: string, remember: boolean) {
    setError(null)
    try {
      const profile = await window.anisav.login(loginValue, password, remember)
      setUser(profile)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка входа')
      throw e
    }
  }

  async function logout() {
    await window.anisav.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, clearError: () => setError(null) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

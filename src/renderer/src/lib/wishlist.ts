import type { Release } from './types'

const KEY = 'anisav:wishlist'
const EVENT = 'anisav:wishlist-changed'

function read(): Release[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function write(items: Release[]): void {
  localStorage.setItem(KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT))
}

export function getWishlist(): Release[] {
  return read()
}

export function isInWishlist(releaseId: number): boolean {
  return read().some((r) => r.id === releaseId)
}

export function addToWishlist(release: Release): void {
  const items = read()
  if (items.some((r) => r.id === release.id)) return
  write([release, ...items])
}

export function removeFromWishlist(releaseId: number): void {
  write(read().filter((r) => r.id !== releaseId))
}

export function toggleWishlist(release: Release): boolean {
  const inList = isInWishlist(release.id)
  if (inList) removeFromWishlist(release.id)
  else addToWishlist(release)
  return !inList
}

export function onWishlistChange(cb: () => void): () => void {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}

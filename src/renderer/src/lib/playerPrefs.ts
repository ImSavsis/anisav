export interface PlayerPrefs {
  autoSkipOpening: boolean
  autoSkipEnding: boolean
  autoPlayNext: boolean
  autoFullscreen: boolean
}

const KEY = 'anisav:playerPrefs'

const DEFAULTS: PlayerPrefs = {
  autoSkipOpening: false,
  autoSkipEnding: false,
  autoPlayNext: true,
  autoFullscreen: false,
}

export function loadPlayerPrefs(): PlayerPrefs {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

export function savePlayerPrefs(prefs: PlayerPrefs): void {
  localStorage.setItem(KEY, JSON.stringify(prefs))
}

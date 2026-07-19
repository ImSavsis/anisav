const KEY = 'anisav:progress'

interface ProgressEntry {
  time: number
  is_watched: boolean
}

function readAll(): Record<string, ProgressEntry> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeAll(data: Record<string, ProgressEntry>): void {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function getLocalProgress(episodeId: string): ProgressEntry | undefined {
  return readAll()[episodeId]
}

export function getAllLocalProgress(): Record<string, ProgressEntry> {
  return readAll()
}

export function saveLocalProgress(episodeId: string, time: number, isWatched: boolean): void {
  const all = readAll()
  all[episodeId] = { time, is_watched: isWatched }
  writeAll(all)
}

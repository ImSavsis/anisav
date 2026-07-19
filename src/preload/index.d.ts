import type { AniSavApi } from './index'

declare global {
  interface Window {
    anisav: AniSavApi
  }
}

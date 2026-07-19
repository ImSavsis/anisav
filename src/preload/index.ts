import { contextBridge, ipcRenderer } from 'electron'
import type { CatalogResponse, CollectionType, HistoryItem, TimecodeItem, UserProfile } from '../shared/types'

const api = {
  openExternal: (url: string): Promise<void> => ipcRenderer.invoke('shell:openExternal', url),

  login: (login: string, password: string, remember: boolean): Promise<UserProfile> =>
    ipcRenderer.invoke('auth:login', login, password, remember),
  loadSavedSession: (): Promise<UserProfile | null> => ipcRenderer.invoke('auth:loadSaved'),
  logout: (): Promise<void> => ipcRenderer.invoke('auth:logout'),

  favoritesList: (page: number, limit: number): Promise<CatalogResponse> =>
    ipcRenderer.invoke('account:favoritesList', page, limit),
  favoriteAdd: (releaseId: number): Promise<void> => ipcRenderer.invoke('account:favoriteAdd', releaseId),
  favoriteRemove: (releaseId: number): Promise<void> =>
    ipcRenderer.invoke('account:favoriteRemove', releaseId),

  collectionList: (typeOfCollection: string, page: number, limit: number): Promise<CatalogResponse> =>
    ipcRenderer.invoke('account:collectionList', typeOfCollection, page, limit),
  collectionAdd: (releaseId: number, typeOfCollection: string): Promise<void> =>
    ipcRenderer.invoke('account:collectionAdd', releaseId, typeOfCollection),
  collectionRemove: (releaseId: number): Promise<void> =>
    ipcRenderer.invoke('account:collectionRemove', releaseId),
  collectionIds: (): Promise<Array<{ release_id: number; type_of_collection: CollectionType }>> =>
    ipcRenderer.invoke('account:collectionIds'),
  favoriteIds: (): Promise<unknown> => ipcRenderer.invoke('account:favoriteIds'),

  historyList: (): Promise<{ data: HistoryItem[] }> => ipcRenderer.invoke('account:historyList'),

  timecodes: (): Promise<TimecodeItem[]> => ipcRenderer.invoke('account:timecodes'),
  timecodeSave: (releaseEpisodeId: string, time: number, isWatched: boolean): Promise<void> =>
    ipcRenderer.invoke('account:timecodeSave', releaseEpisodeId, time, isWatched),
}

contextBridge.exposeInMainWorld('anisav', api)

export type AniSavApi = typeof api

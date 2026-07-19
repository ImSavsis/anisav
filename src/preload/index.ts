import { contextBridge, ipcRenderer } from 'electron'

const api = {
  openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url),

  login: (login: string, password: string, remember: boolean) =>
    ipcRenderer.invoke('auth:login', login, password, remember),
  loadSavedSession: () => ipcRenderer.invoke('auth:loadSaved'),
  logout: () => ipcRenderer.invoke('auth:logout'),

  favoritesList: (page: number, limit: number) =>
    ipcRenderer.invoke('account:favoritesList', page, limit),
  favoriteAdd: (releaseId: number) => ipcRenderer.invoke('account:favoriteAdd', releaseId),
  favoriteRemove: (releaseId: number) => ipcRenderer.invoke('account:favoriteRemove', releaseId),

  collectionList: (typeOfCollection: string, page: number, limit: number) =>
    ipcRenderer.invoke('account:collectionList', typeOfCollection, page, limit),
  collectionAdd: (releaseId: number, typeOfCollection: string) =>
    ipcRenderer.invoke('account:collectionAdd', releaseId, typeOfCollection),
  collectionRemove: (releaseId: number) => ipcRenderer.invoke('account:collectionRemove', releaseId),
  collectionIds: () => ipcRenderer.invoke('account:collectionIds'),
  favoriteIds: () => ipcRenderer.invoke('account:favoriteIds'),

  historyList: () => ipcRenderer.invoke('account:historyList'),

  timecodes: () => ipcRenderer.invoke('account:timecodes'),
  timecodeSave: (releaseEpisodeId: string, time: number, isWatched: boolean) =>
    ipcRenderer.invoke('account:timecodeSave', releaseEpisodeId, time, isWatched),
}

contextBridge.exposeInMainWorld('anisav', api)

export type AniSavApi = typeof api

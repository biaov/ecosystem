interface ResponseError {
  data?: {
    message?: string
  }
}

interface ResponseSuccess<T> {
  data: T
}

interface Page {
  current: number
  pageSize: number
}

interface PageDataType<T = Record<string, unknown>> {
  items: T[]
  total: number
  current: number
  pageSize: number
}

interface IdDataType {
  id: number
}

/**
 * pwa
 */
declare module 'virtual:pwa-register/vue' {
  import type { Ref } from 'vue'

  export interface RegisterSWOptions {
    immediate?: boolean
    onNeedRefresh?: () => void
    onOfflineReady?: () => void
    onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
    onRegisterError?: (error: any) => void
  }

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: Ref<boolean>
    offlineReady: Ref<boolean>
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}

interface SearchTransformForm {
  type: string
  keyword: string
  [key: string]: string
}

declare module 'quill-image-uploader'
declare module 'quill-emoji'

interface Document {
  caretPositionFromPoint(
    x: number,
    y: number
  ): {
    offsetNode: Node
    offset: number
  }
}

import { service } from '@/utils/request'
import { PagingResponse, USEApiRequestName } from './types'

export const useRestful = (path: string) => ({
  paging: (query = {}) => service.get(path, { params: query }) as Promise<PagingResponse>,
  all: <T extends Record<string, any>>(query = {}) => service.get(path, { params: { ...query, all: true } }) as Promise<T[]>,
  get: <T extends Record<string, any>>(id: number) => service.get(`${path}/${id}`) as Promise<T>,
  create: (data = {}) => service.post(path, data),
  delete: (id: number) => service.delete(`${path}/${id}`),
  update: <T = boolean>(id: number, data = {}) => service.patch(`${path}/${id}`, data) as Promise<T>,
  replace: (id: number, data = {}) => service.put(`${path}/${id}`, data)
})

export const useCommand = (path: string) => ({
  get: <T = Record<string, unknown>>(query = {}) => service.get(path, { params: query }) as Promise<T>,
  post: <T>(data = {}, config = {}) => service.post(path, data, config) as Promise<T>,
  update: <T>(data = {}, config = {}) => service.post(`${path}/update`, data, config) as Promise<T>,
  token: () => `/api/${path}?token=${useStore().state.token}`
})

/**
 * 请求提示/请求锁
 */
let loadingRequestLock = false
export const useLoadingRequest = async <T = unknown>(fn: () => Promise<T>) => {
  if (loadingRequestLock) return
  loadingRequestLock = true
  return fn().finally(() => {
    loadingRequestLock = false
  })
}

/**
 * 提示请求
 */
export const useToastRequest = async <T = unknown>(promise: () => Promise<T>, resolve: () => void) => {
  try {
    await useLoadingRequest(promise)
    resolve && resolve()
    message.success('操作成功')
  } catch (error) {
    message.error((error as ResponseError)?.data?.message || '操作失败')
  }
}

/**
 * 分页请求
 */
export const usePagingApiRequest = <T extends Record<string, any> = {}>(
  request: (value: Page) => Promise<unknown>,
  initalPage = { current: 1, pageSize: 10 },
  calledOnMounted = true,
  showLoading = false
) => {
  const loading = ref(false)
  const page = ref({ ...initalPage })

  const data = ref<PageDataType<T>>({ items: [] as T[], total: 0, current: initalPage.current, pageSize: initalPage.pageSize })

  const getData = async (curPage = initalPage) => {
    if (curPage.pageSize != page.value.pageSize || curPage.current != page.value.current) {
      page.value = curPage
    }
    loading.value = true
    try {
      const requstPromise = request({ ...page.value })
      data.value = (await (showLoading ? useLoadingRequest(() => requstPromise) : requstPromise)) as PageDataType<T>
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const refresh = () => getData(page.value)

  calledOnMounted && onMounted(getData)

  return {
    data,
    getData,
    loading,
    page,
    refresh,
    setPage: ({ current, pageSize } = initalPage) => {
      page.value = { current: current || initalPage.current, pageSize: pageSize || initalPage.pageSize }
      getData(page.value)
    }
  }
}

/**
 * 普通请求
 */
export const useApiRequest = <T = unknown>(request: () => Promise<unknown>, calledOnMounted = true, initData: unknown = [], callback?: USEApiRequestName.Callback<T>, showLoadingMessage = false) => {
  const loading = ref(false)
  const data = ref<T>(initData as T)
  let loadingClose: ReturnType<typeof message.loading> | undefined
  showLoadingMessage && (loadingClose = message.loading('数据加载中...'))

  const getData = async () => {
    loading.value = true
    try {
      data.value = (await request()) as unknown as T
    } catch (error) {
      throw error
    } finally {
      loading.value = false
      loadingClose && loadingClose()
    }
    callback && callback(data.value)
  }

  calledOnMounted && onMounted(getData)

  return {
    data,
    getData,
    loading
  }
}

import { defaultPageSize } from '@/config'
import type { LoadingMore } from '@/components/types'
import type { UsePagingRequestParam, UseDetailRequest } from './types'

/**
 * 分页请求
 */
export const usePagingRequest = <T extends Record<string, unknown>>(
  /**
   * 请求函数
   */
  request: UsePagingRequestParam.Request,
  /**
   * 是否立即请求
   */
  isRequest = true,
  /**
   * 初始化分页参数
   */
  initPagation: Partial<UsePagingRequestParam.Pagation> = {},
  /**
   * 数据转换
   */
  transform: UsePagingRequestParam.Transform = data => data
) => {
  /**
   * 分页参数
   */
  const pagation = ref<UsePagingRequestParam.Pagation>({ current: 1, pageSize: defaultPageSize, hasNext: true, ...initPagation })

  /**
   * 列表数据
   */
  const listData: Ref<T[]> = ref([])

  /**
   * 加载状态
   */
  const loadingStatus = ref<Required<LoadingMore.Props>['status']>('loadMore')

  /**
   * 加载数据
   */
  const loadData = async () => {
    const { current, pageSize, hasNext } = pagation.value
    if (!hasNext || loadingStatus.value !== 'loadMore') return
    loadingStatus.value = 'loading'
    const { items, meta } = await request<T>({ current, pageSize })
    const newList = transform(items)
    listData.value = current === 1 ? newList : [...listData.value, ...newList]
    pagation.value = { ...pagation.value, current: current + 1, hasNext: meta.hasNext }
    loadingStatus.value = meta.hasNext ? 'loadMore' : 'noMore'
  }

  isRequest && loadData()

  return {
    pagation,
    listData,
    loadData,
    loadingStatus
  }
}

/**
 * 详情请求
 */
export const useDetailRequest = <T extends Record<string, unknown>>(
  /**
   * 请求函数
   */
  request: UseDetailRequest.Request,
  /**
   * 是否立即请求
   */
  isRequest = true,
  /**
   * 数据转换
   */
  transform: UseDetailRequest.Transform = data => data
) => {
  /**
   * 详情数据
   */
  const detail = ref({}) as Ref<T>

  /**
   * 加载状态
   */
  const loading = ref(false)

  /**
   * 加载数据
   */
  const loadData = async () => {
    if (loading.value) return
    loading.value = true
    try {
      const response = await request<T>()
      const newResponse = transform(response)
      detail.value = newResponse
    } catch (error) {
      throw new Error(error as string)
    } finally {
      loading.value = false
    }
  }

  isRequest && loadData()

  return {
    detail,
    loadData,
    loading
  }
}

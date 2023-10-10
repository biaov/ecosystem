import { caseMoreApi } from '@/api/case'
import type { CaseMoreListItem } from './types'

/**
 * 热点推荐
 */
export const useCaseMore = () => {
  const caseMoreList = ref<CaseMoreListItem[]>([])

  const loadCaseMoreData = async () => {
    const { items } = await caseMoreApi.paging<CaseMoreListItem>({ current: 1, pageSize: 20 })
    caseMoreList.value = items
  }

  const onClickCaseMoreItem = (item: CaseMoreListItem) => {
    uni.navigateTo({ url: item.pageUrl })
  }

  return { caseMoreList, loadCaseMoreData, onClickCaseMoreItem }
}

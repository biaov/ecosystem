import { featureApi } from '@/api/manage'
import { toast } from '@/utils/function'
import { platforms } from './enums'
import { ListItem } from './types'

/**
 * 功能
 */
export const useFeature = () => {
  const featureList = ref<ListItem[]>([])

  const loadFeatureData = async () => {
    const { items } = await featureApi.paging<ListItem>({ isShow: true, current: 1, pageSize: 20 })
    featureList.value = items
  }

  const onClickFeatureItem = (item: ListItem) => {
    // #ifdef APP-PLUS
    if (!item.platforms.includes(platforms.app)) {
      toast('不属于此平台端功能')
      return
    }
    // #endif
    // #ifdef H5
    if (!item.platforms.includes(platforms.h5)) {
      toast('不属于此平台端功能')
      return
    }
    // #endif
    // #ifdef MP-WEIXIN
    if (!item.platforms.includes(platforms.miniprogram)) {
      toast('不属于此平台端功能')
      return
    }
    // #endif
    uni.navigateTo({ url: item.pageUrl })
  }

  return { featureList, loadFeatureData, onClickFeatureItem }
}

import { drawPrizeApi } from '@/api/activity'
import type { DrawPrizeItem } from './types'

/**
 * 抽奖列表数据
 */
export const useDrawPrizeList = () => {
  const drawPrizeList = ref<DrawPrizeItem[]>([])

  const loadPrizeData = async () => {
    const data = await drawPrizeApi.all<DrawPrizeItem[]>()
    drawPrizeList.value = data
  }

  const onClickItem = (item: DrawPrizeItem) => {
    uni.navigateTo({
      url: `/pages/activity/draw-prize/index?id=${item.id}`
    })
  }

  return { drawPrizeList, loadPrizeData, onClickItem }
}

import type { GoodsItemType, AttrType, TransformGoodsDataType } from '@/api/types'

/**
 * 移动放大图片
 */
export const useDetailMove = (data: Ref<TransformGoodsDataType | undefined>) => {
  const isVideo = computed(() => (currentImg.value ? currentImg.value === 'video' : data.value?.currentImg === 'video'))
  const currentImg = ref(data.value?.currentImg)
  const onMouseenter = (url: string) => {
    currentImg.value = url
  }

  const move = reactive({ x: 0, y: 0 })
  const rectRef = useTemplateRef<HTMLDivElement>('rectNode')
  const moveNode = useTemplateRef<HTMLDivElement>('moveNode')
  const movesize = computed(() => moveNode.value && moveNode.value.getBoundingClientRect())
  const rectsize = computed(() => rectRef.value && rectRef.value.getBoundingClientRect())
  const rengeValue = (cx: number, rx: number, width: number) => {
    const iw = cx - rx
    let x = iw - movesize.value!.width / 2
    x < 0 && (x = 0)
    const maxX = width - movesize.value!.width
    x > maxX && (x = maxX)
    return x
  }
  const setMove = ({ clientX, clientY }: MouseEvent) => {
    const { x: rx, y: ry, width, height } = rectsize.value!
    move.x = rengeValue(clientX, rx, width)
    move.y = rengeValue(clientY, ry, height)
  }

  return { isVideo, currentImg, onMouseenter, move, moveNode, movesize, rectsize, setMove }
}

/**
 * 信息处理
 */
export const useDetailInfo = (data: Ref<TransformGoodsDataType | undefined>) => {
  const selectSku = ref<string>()
  const selectAttr = ref<AttrType[]>([])
  const curPrice = computed(() => {
    if (!data.value) return
    const { specs, defaultPrice } = data.value
    if (selectAttr.value.length !== specs[0]!.attrs.length) {
      selectSku.value = ''
      return defaultPrice
    }
    const item = specs.find(item => !item.attrs.some(attr => !isExist(selectAttr.value, attr.label, attr.value)))!
    selectSku.value = item.sku
    return item.price
  })

  const isExist = (arr: AttrType[], label: string, value: string) => arr.some(item => item.label === label && item.value === value)
  const defaultNum = 99 // 默认数量
  const stock = computed(() => {
    if (!data.value) return defaultNum
    const { specs } = data.value
    if (specs[0]?.attrs.length !== selectAttr.value.length) return defaultNum
    return specs.find(item => !item.attrs.some(attr => !isExist(selectAttr.value, attr.label, attr.value)))!.stock
  })

  return { selectSku, selectAttr, curPrice, stock }
}

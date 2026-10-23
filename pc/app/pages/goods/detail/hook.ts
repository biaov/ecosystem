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
  const imgRef = useTemplateRef<HTMLImageElement>('imgNode')

  const movesize = computed(() => moveNode.value?.getBoundingClientRect())
  const rectsize = computed(() => rectRef.value?.getBoundingClientRect())
  // 图片原始尺寸（object-contain 需按原图比例计算，避免拉伸变形）
  const naturalSize = computed(() => {
    const img = imgRef.value
    return img?.naturalWidth && img?.naturalHeight ? { width: img.naturalWidth, height: img.naturalHeight } : null
  })

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

  // 放大镜样式：按 contain 显示区域等比放大，并限制在图片范围内
  const zoomStyle = computed(() => {
    const rect = rectsize.value
    const lens = movesize.value
    const natural = naturalSize.value
    if (!rect || !lens || !natural) return {}
    const scale = Math.min(rect.width / natural.width, rect.height / natural.height)
    const width = natural.width * scale
    const height = natural.height * scale
    const offsetX = (rect.width - width) / 2
    const offsetY = (rect.height - height) / 2
    const clampRange = (v: number, len: number, total: number) => (len >= total ? (total - len) / 2 : Math.min(Math.max(v, 0), total - len))
    const left = clampRange(move.x - offsetX, lens.width, width)
    const top = clampRange(move.y - offsetY, lens.height, height)
    return {
      width: `${lens.width}px`,
      height: `${lens.height}px`,
      backgroundImage: `url(${currentImg.value || data.value?.currentImg})`,
      backgroundSize: `${width}px ${height}px`,
      backgroundPosition: `-${left}px -${top}px`
    }
  })

  return { isVideo, currentImg, onMouseenter, move, setMove, zoomStyle }
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

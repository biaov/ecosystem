import { useUtils } from 'mine-h5-ui'

const scroll = reactive({
  clientHeight: 0,
  scrollHeight: 0,
  scrollTop: 0
})

/**
 * 滚动条滚动事件
 */
export const useScrollStore = ({ handleScroll, loadMore, lowerThreshold = 250 }: { handleScroll?: (scrollTop: number) => void; loadMore?: () => void; lowerThreshold?: number } = {}) => {
  const scrollRef = useTemplateRef<HTMLDivElement>('scrollNode')
  const { throttle } = useUtils()
  const loadMoreThrottle = throttle(() => {
    loadMore?.()
  }, 100)

  const onScroll = (e: Event) => {
    setScrollOption()
    scroll.scrollTop = (e.target as HTMLDivElement).scrollTop
  }

  watch(
    () => scroll.scrollTop,
    value => {
      handleScroll?.(value)
      scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - lowerThreshold && loadMoreThrottle()
    }
  )

  const setScrollOption = () => {
    const { clientHeight, scrollHeight } = scrollRef.value!
    scroll.clientHeight = clientHeight
    scroll.scrollHeight = scrollHeight
  }

  return { scroll: readonly(scroll), onScroll, setScrollOption }
}

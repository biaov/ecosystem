const scroll = reactive({
  clientHeight: 0,
  scrollHeight: 0,
  scrollTop: 0
})

/**
 * 滚动条滚动事件
 */
export const useScrollStore = ({ handleScroll, loadMore, lowerThreshold = 50 }: { handleScroll?: (scrollTop: number) => void; loadMore?: () => void; lowerThreshold?: number } = {}) => {
  const onScroll = (e: Event) => {
    scroll.scrollTop = (e.target as HTMLDivElement).scrollTop
  }

  watch(
    () => scroll.scrollTop,
    value => {
      handleScroll?.(value)
      scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - lowerThreshold && loadMore?.()
    }
  )

  const setScrollOption = ({ clientHeight, scrollHeight }: { clientHeight: number; scrollHeight: number }) => {
    scroll.clientHeight = clientHeight
    scroll.scrollHeight = scrollHeight
  }

  return { scroll: readonly(scroll), onScroll, setScrollOption }
}

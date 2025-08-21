import { Chart } from '@antv/g2'

interface Option {
  container?: string | HTMLDivElement
  height?: number
  padding?: number
}

/**
 * 调用图表
 */
export const useChart = (callback: (chart: Chart, ...args: any[]) => void, option?: Option) => {
  const nodeRef = ref<HTMLDivElement>()
  const render = async <T>(...args: T[]) => {
    await nextTick()
    const chart = new Chart({ container: nodeRef.value!, height: 500, autoFit: true, ...(option ?? {}) })
    callback.call(null, chart, ...args)
    chart.render()
  }
  return { nodeRef, render }
}

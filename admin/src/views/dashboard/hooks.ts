import type { DashboardName } from '@/api/types'
import cloudData from './cloud.data'

/**
 * 销售趋势图
 */
export const useSaleChart = () => {
  const labelFormatter = (d: number) => `¥ ${d}`
  const { nodeRef: saleChartRef, render: saleRenderData } = useChart((chart, res: DashboardName.DashboardType) => {
    chart.data(res.salesList)
    chart.scale({
      y: {
        domainMin: 0,
        nice: true
      }
    })
    chart.axis('y', {
      title: '销售额',
      labelFormatter
    })
    chart.axis('x', {
      title: '日期'
    })
    chart.encode('x', 'label').encode('y', 'value').encode('color', 'label').legend(false)
    chart
      .line()
      .encode('shape', 'smooth')
      .style({
        gradient: 'x',
        gradientColor: 'start',
        lineWidth: 3,
        shadowColor: '#ccc',
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5
      })
      .tooltip({
        title: 'label',
        items: [
          d => ({
            name: '销售额',
            value: labelFormatter(d.value)
          })
        ]
      })
      .animate('enter', { type: 'pathIn', duration: 1000 })
    chart.point().encode('shape', 'point').tooltip(false)
  })

  return { saleChartRef, saleRenderData }
}

/**
 * 用户趋势图
 */
export const useUserChart = () => {
  const labelFormatter = (d: number) => `${d} 人`
  const { nodeRef: userChartRef, render: userRenderData } = useChart((chart, res: DashboardName.DashboardType) => {
    chart.data(res.userList)
    chart.scale({
      x: {
        range: [0, 1]
      },
      y: {
        nice: true
      }
    })
    chart.axis('y', {
      title: '注册用户',
      labelFormatter,
      tickFilter: (datum: number) => ~~datum === datum
    })
    chart.axis('x', {
      title: '日期'
    })
    chart.encode('x', 'label').encode('y', 'value').encode('color', 'label').legend(false)
    chart
      .interval()
      .tooltip({
        title: 'label',
        items: [
          d => ({
            name: '注册用户',
            value: labelFormatter(d.value)
          })
        ]
      })
      .animate('enter', { type: 'scaleInY', duration: 1000 })
  })

  return { userChartRef, userRenderData }
}

/**
 * 技术栈词云
 */
export const useTechStackChart = () => {
  const max = 100
  const min = 20

  const randomValue = (text: string) => ({ text, value: ~~(Math.random() * (max - min + 1)) + min })

  const { nodeRef: techStackRef, render: techStackRenderData } = useChart(chart => {
    chart
      .wordCloud()
      .data(cloudData.map(randomValue))
      .layout({
        spiral: 'rectangular',
        fontSize: [20, 100]
      })
      .encode('color', 'text')
      .legend(false)
      .animate('enter', { type: 'zoomIn', duration: 1000 })
  })

  return { techStackRef, techStackRenderData }
}

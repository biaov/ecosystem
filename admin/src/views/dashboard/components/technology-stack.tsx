import { useState, useEffect } from 'react'
import { Card, Row, Select, Space } from 'antd'
import { Chart } from '@antv/g2'
import { setStorage, getStorage } from '@/utils/storage'

export default function TechnologyStackComponent() {
  const [chartType, setChartType] = useState('pie')
  const renderData = [
    { lang: 'TS', ratio: 40 },
    { lang: 'REACT', ratio: 30 },
    { lang: 'AXIOS', ratio: 5 },
    { lang: 'HTML', ratio: 15 },
    { lang: 'LESS', ratio: 10 }
  ]
  const options = [
    { label: '饼图', value: 'pie' },
    { label: '环图', value: 'ring' },
    { label: '柱状图', value: 'histogram' },
    { label: '条形图', value: 'bar' },
    { label: '折线图', value: 'line' },
    { label: '面积图', value: 'area' }
  ]

  const renderChart = () => {
    const proportionDom = document.getElementById('proportion')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (!proportionDom) return () => {}
    proportionDom.innerHTML = ''

    /**
     * 初始化图表实例
     */
    const chart = new Chart({
      container: proportionDom,
      autoFit: true
    })
    chart.data(renderData)
    chart.scale({
      lang: {
        alias: '语言'
      },
      ratio: {
        alias: '占比'
      }
    })
    chart.legend({
      position: 'bottom'
    })
    switch (chartType) {
      case 'pie':
        chart.coordinate('theta', {
          radius: 0.75
        })
        chart
          .interval()
          .position('ratio')
          .color('lang')
          .tooltip('lang*ratio')
          .adjust('stack')
          .label('ratio', {
            content: ({ lang, ratio }) => `${lang} ${ratio}%`
          })
          .style({
            lineWidth: 1,
            stroke: '#fff',
            opacity: 0.4
          })

        chart.tooltip({
          showTitle: false,
          showMarkers: false
        })
        chart.interaction('element-single-selected')
        break
      case 'ring':
        chart.coordinate('theta', {
          radius: 0.75,
          innerRadius: 0.6
        })
        chart
          .interval()
          .position('ratio')
          .color('lang')
          .tooltip('lang*ratio')
          .adjust('stack')
          .label('ratio', {
            content: ({ lang, ratio }) => `${lang} ${ratio}%`
          })
          .style({
            lineWidth: 1,
            stroke: '#fff',
            opacity: 0.4
          })

        chart.tooltip({
          showTitle: false,
          showMarkers: false
        })
        chart.interaction('element-single-selected')
        break
      case 'histogram':
        chart.tooltip({
          showMarkers: false,
          showTitle: false
        })
        chart.interval().position('lang*ratio').color('lang')
        break
      case 'bar':
        chart.coordinate().transpose()
        chart.tooltip({
          showMarkers: false,
          showTitle: false
        })
        chart.interval().position('lang*ratio').color('lang')
        break
      case 'line':
        chart.line().position('lang*ratio').shape('smooth')
        chart.point().position('lang*ratio').color('lang').shape('circle')
        chart.scale('ratio', {
          min: 0,
          alias: '占比'
        })
        break
      case 'area':
        chart.line().position('lang*ratio').shape('smooth')
        chart.point().position('lang*ratio').color('lang').shape('circle')
        chart.area().position('lang*ratio').shape('smooth')
        chart.scale('ratio', {
          min: 0,
          alias: '占比'
        })
        break
    }

    chart.render()

    return () => {
      chart.destroy()
    }
  }
  const onChange = (value: string) => {
    setChartType(value)
    setStorage('chartType', value)
  }
  useEffect(renderChart, [chartType])
  useEffect(() => {
    const chartTypeStorage = getStorage('chartType') as string
    chartTypeStorage && setChartType(chartTypeStorage)
  }, [])

  return (
    <Card title="技术栈">
      <Space direction="vertical" className="w-fill">
        <Row justify="end">
          <Select value={chartType} options={options} className="w-120" onChange={onChange}></Select>
        </Row>
        <div id="proportion" style={{ height: 489 }}></div>
      </Space>
    </Card>
  )
}

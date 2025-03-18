import { useState, useEffect } from 'react'
import { Card, Row, Select, Space } from 'antd'
import { Chart } from '@antv/g2'
import { setStorage, getStorage } from '@/utils/storage'

interface DataItem {
  lang: string
  ratio: number
}

export default function TechnologyStackComponent() {
  const [chartType, setChartType] = useState('pie')
  const renderData: DataItem[] = [
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
    chart.legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
    chart.axis({
      x: {
        title: '语言'
      },
      y: {
        title: '比例'
      }
    })

    const labelOption = {
      position: 'outside',
      text: ({ lang, ratio }: DataItem) => `${lang}: ${ratio}%`
    }
    const tooltipOption = ({ lang, ratio }: DataItem) => ({
      name: lang,
      value: labelFormatter.labelFormatter(ratio)
    })

    const labelFormatter = {
      labelFormatter: (v: number | string) => `${v}%`
    }

    const position = { x: 'lang', y: 'ratio' }

    switch (chartType) {
      case 'pie':
        chart.coordinate({ type: 'theta', outerRadius: 0.8 })
        chart.interval().transform({ type: 'stackY' }).encode('y', 'ratio').encode('color', 'lang').label(labelOption).tooltip(tooltipOption)
        break
      case 'ring':
        chart.coordinate({ type: 'theta', outerRadius: 0.8, innerRadius: 0.5 })
        chart.interval().transform({ type: 'stackY' }).encode('y', 'ratio').encode('color', 'lang').label(labelOption).tooltip(tooltipOption)
        break
      case 'histogram':
        chart.interval().encode(position).encode('color', 'lang').tooltip(tooltipOption).axis('y', labelFormatter)
        break
      case 'bar':
        chart
          .interval()
          .coordinate({ transform: [{ type: 'transpose' }] })
          .encode(position)
          .encode('color', 'lang')
          .tooltip(tooltipOption)
          .axis('y', labelFormatter)
        break
      case 'line':
        chart
          .encode(position)
          .scale('y', {
            domainMin: 0
          })
          .axis('y', {
            ...labelFormatter,
            title: '比例'
          })
        chart.line().encode('shape', 'smooth').tooltip(false)
        chart.point().encode('color', 'lang').encode('shape', 'circle').tooltip(tooltipOption)
        break
      case 'area': {
        const colors = ['35,137,255', '13,204,204', '241,142,86', '215,135,255', '127,107,255']
        const gradient = colors.reduce((prev, item, i) => `${prev}, rgba(${item},1) ${(i / (colors.length - 1)) * 100}%`, '0deg')
        chart.encode(position).axis('y', {
          ...labelFormatter,
          title: '比例'
        })
        chart.line().style('strokeWidth', 2).encode('shape', 'smooth').tooltip(false).style('stoken', `linear-gradient(${gradient})`)
        chart.point().encode('color', 'lang').encode('shape', 'circle').tooltip(tooltipOption)
        chart.area().encode('shape', 'smooth').tooltip(false).style('fill', `linear-gradient(${gradient})`)
        break
      }
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

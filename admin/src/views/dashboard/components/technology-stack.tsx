import { useEffect } from 'react'
import { Card } from 'antd'
import { Chart } from '@antv/g2'

export default function TechnologyStackComponent() {
  useEffect(() => {
    const data = [
      { lang: 'TS', ratio: 40 },
      { lang: 'REACT', ratio: 30 },
      { lang: 'AXIOS', ratio: 5 },
      { lang: 'HTML', ratio: 15 },
      { lang: 'LESS', ratio: 10 }
    ]

    /**
     * 初始化图表实例
     */
    const chart = new Chart({
      container: 'proportion',
      autoFit: true
    })

    chart.coordinate('theta', {
      radius: 0.75
    })

    chart.data(data)
    chart.scale({
      lang: {
        alias: '语言'
      },
      ratio: {
        alias: '占比'
      }
    })
    chart.interval().position('ratio').color('lang').tooltip('lang*ratio').adjust('stack')
    chart.legend({
      position: 'top'
    })
    chart.tooltip({
      showTitle: false,
      showMarkers: false
    })
    chart.render()

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <Card title="技术栈">
      <div id="proportion" style={{ height: 530 }}></div>
    </Card>
  )
}

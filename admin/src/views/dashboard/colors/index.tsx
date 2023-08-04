import { Card, Space, ColorPicker, Alert } from 'antd'
import { colorList } from '@/config'

export default function Colors() {
  return (
    <Card title="颜色">
      <Alert message="点击颜色可查看详情" type="info" banner closable className="m-b-20" />
      <Space size={[20, 20]} wrap>
        {colorList.map((item, index) => (
          <ColorPicker presets={[{ label: '预设值', colors: colorList }]} defaultValue={item} key={index} showText></ColorPicker>
        ))}
      </Space>
    </Card>
  )
}

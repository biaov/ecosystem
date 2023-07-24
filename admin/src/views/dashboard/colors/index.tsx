import { Badge, Card, Space, ColorPicker } from 'antd'
import { colorList } from '@/config'

export default function Colors() {
  return (
    <Card title="颜色">
      <Space size={[50, 20]} wrap>
        {colorList.map((item, index) => (
          <ColorPicker value={item} key={index} format="hex">
            <Badge color={item} text={<span className="inline-block w-60">{item}</span>} />
          </ColorPicker>
        ))}
      </Space>
    </Card>
  )
}

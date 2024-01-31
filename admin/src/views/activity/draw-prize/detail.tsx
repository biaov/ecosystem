import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Space, message, DatePicker, InputNumber } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import type { Dayjs } from 'dayjs'
import { activityDrawPrizeApi } from '@/api/activity'
import RichText from '@/components/rich-text'
import { DataType } from './types'

export default function RecommendDetailPage() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: Record<string, unknown>) => {
    const [startDayjs, endDayjs] = values.range as Dayjs[]
    const startTime = startDayjs.format('YYYY-MM-DD HH:mm:ss')
    const endTime = endDayjs.format('YYYY-MM-DD HH:mm:ss')
    delete values.range

    const params = { ...values, startTime, endTime }
    id ? await activityDrawPrizeApi.update(+id, params) : await activityDrawPrizeApi.create(params)
    message.success('操作成功')
    navigate(-1)
  }
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }

  const formProps = {
    ...formItemLayout,
    form,
    onFinish
  }
  const [disabled, setDisabled] = useState(false)
  const loadData = async () => {
    if (!id) return
    setDisabled(true)
    const res: Record<string, any> = await activityDrawPrizeApi.get<DataType>(+id)
    res.range = [dayjs(res.startTime), dayjs(res.endTime)]

    form.setFieldsValue(res)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card title="详情">
      <Form {...formProps}>
        <Form.Item name="name" label="活动名称" rules={[{ required: true, message: '请输入活动名称' }]}>
          <Input placeholder="请输入活动名称，不能超过20个字" maxLength={20} />
        </Form.Item>
        <Form.Item name="range" label="时间范围" rules={[{ type: 'array' as const, required: true, message: '请选择时间范围' }]}>
          <DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item label="活动规则" required className="m-b-0">
          <Form.List name="rules" initialValue={[{ name: undefined, prizeName: undefined, stock: undefined }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Form.Item required={false} key={field.key} className="m-b-0">
                    <Space align="baseline">
                      <Form.Item name={[field.name, 'name']} rules={[{ required: true, message: '请输入奖项名称' }]}>
                        <Input placeholder="奖项名称" className="w-120" disabled={disabled} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'prizeName']} rules={[{ required: true, message: '请输入奖品名称' }]}>
                        <Input placeholder="奖品名称" className="w-200" disabled={disabled} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'stock']} rules={[{ required: true, message: '请输入奖品数量' }]}>
                        <InputNumber placeholder="奖品数量" className="w-120" maxLength={11} disabled={disabled} />
                      </Form.Item>
                      <Button type="link" icon={<MinusCircleOutlined />} disabled={fields.length <= 1 || disabled} onClick={() => remove(field.name)} />
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button onClick={() => add()} icon={<PlusOutlined />} disabled={disabled}>
                    新增规则
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="参与用户" required className="m-b-0">
          <Form.List name="users" initialValue={[{ username: undefined, phoneNumber: undefined }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Form.Item required={false} key={field.key} className="m-b-0">
                    <Space align="baseline">
                      <Form.Item name={[field.name, 'username']} rules={[{ required: true, message: '请输入用户姓名' }]}>
                        <Input placeholder="用户姓名" className="w-200" disabled={disabled} />
                      </Form.Item>
                      <Form.Item name={[field.name, 'phoneNumber']} rules={[{ required: true, message: '请输入用户手机' }]}>
                        <InputNumber placeholder="用户手机" className="w-200" maxLength={11} disabled={disabled} />
                      </Form.Item>
                      <Button type="link" icon={<MinusCircleOutlined />} disabled={fields.length <= 1 || disabled} onClick={() => remove(field.name)} />
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button disabled={disabled} onClick={() => add()} icon={<PlusOutlined />}>
                    新增用户
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name="desc" label="活动描述" rules={[{ required: true, message: '请输入文章内容' }]}>
          <RichText />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button
              onClick={() => {
                navigate(-1)
              }}
            >
              取消
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

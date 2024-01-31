import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Space, message } from 'antd'
import { recommendApi } from '@/api/manage'
import UploadImg from '@/components/upload-img'
import RichText from '@/components/rich-text'
import { DataType } from './types'

export default function RecommendDetailPage() {
  const { id } = useParams()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: Record<string, unknown>) => {
    const [coverUrl] = values.coverUrl as string[]
    const params = { ...values, coverUrl }
    await recommendApi.create(params)
    message.success('操作成功')
    navigate(-1)
  }
  const formProps = {
    form,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    onFinish
  }
  const loadData = async () => {
    if (!id) return
    const res = await recommendApi.get<DataType>(+id)
    form.setFieldsValue({ ...res, coverUrl: [res.coverUrl] })
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card title="详情">
      <Form {...formProps}>
        <Form.Item name="title" label="文章标题" rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item label="封面图" name="coverUrl" valuePropName="list" rules={[{ required: true, message: '请上传封面图' }]}>
          <UploadImg />
        </Form.Item>
        <Form.Item name="pageUrl" label="页面地址" rules={[{ required: true, message: '请输入页面地址' }]}>
          <Input placeholder="请输入页面地址" />
        </Form.Item>
        <Form.Item name="content" label="文章内容" rules={[{ required: true, message: '请输入文章内容' }]}>
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

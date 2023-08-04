import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Form, Input, Button, Space, Modal, Table, message, Popconfirm, Image, Select } from 'antd'
import { recommendApi } from '@/api/manage'
import UploadImg from '@/components/upload-img'
import RichText from '@/components/rich-text'
import { DataType } from './types'

export default function RecommendDetailPage() {
  const { id } = useParams()
  const [form] = Form.useForm()

  const onFinish = async (values: Record<string, unknown>) => {
    console.log(values, '--')
  }
  const formProps = {
    form,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    onFinish,
    onFinishFailed: (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
  }
  const [pageData, setPageData] = useState<Partial<DataType>>({})
  const loadData = async () => {
    if (!id) return
    const res = await recommendApi.get<DataType>(+id)
    setPageData(res)
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
          <UploadImg></UploadImg>
        </Form.Item>
        <Form.Item name="content" label="文章内容" rules={[{ required: true, message: '请输入文章内容' }]}>
          <RichText></RichText>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button>取消</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}

import { Form, Input, Modal, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { editPwdApi } from '@/api/auth'
import type { EditPwdProps } from './types'

export default function EditPwd({ visible, onChange }: EditPwdProps) {
  const [form] = Form.useForm()
  const onCancel = () => {
    onChange && onChange(false)
  }

  const formProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    form,
    initialValues: { remember: true }
  }

  const handleOk = async () => {
    await form.validateFields()
    await editPwdApi.post(form.getFieldsValue())
    message.success('修改成功')
    onCancel()
  }

  return (
    <Modal title="修改密码" okText="提交" width={450} open={visible} onOk={handleOk} onCancel={onCancel}>
      <Form {...formProps}>
        <Form.Item label="原密码" name="oPassword" rules={[{ required: true, message: '请输入原密码' }]}>
          <Input prefix={<LockOutlined className="color-25" />} placeholder="请输入原密码" allowClear />
        </Form.Item>
        <Form.Item label="新密码" name="nPassword" rules={[{ required: true, message: '请输入新密码' }]}>
          <Input.Password prefix={<LockOutlined className="color-25" />} placeholder="请输入新密码" allowClear />
        </Form.Item>
        <Form.Item label="确认密码" name="cPassword" rules={[{ required: true, message: '请输入确认密码' }]}>
          <Input.Password prefix={<LockOutlined className="color-25" />} placeholder="请输入确认密码" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}

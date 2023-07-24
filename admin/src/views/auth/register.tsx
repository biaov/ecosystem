import { Button, Card, Form, Input, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { registerApi } from '@/api/auth'
import styles from './register.module.less'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: Record<string, unknown>) => {
    await registerApi.post(values)
    message.success('注册成功')
    navigate('/login')
  }

  const formProps = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
    onFinish,
    form,
    initialValues: { remember: true }
  }

  const onLogin = () => {
    navigate('/login')
  }

  return (
    <div className={`${styles.wrap} w-vw h-vh flex flex-center hidden p-0`}>
      <Card title="注册" style={{ width: 380 }}>
        <Form {...formProps}>
          <Form.Item name="phoneNumber" rules={[{ required: true, message: '请输入手机号码' }]}>
            <Input prefix={<UserOutlined className="color-25" />} placeholder="请输入手机号码" allowClear />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined className="color-25" />} placeholder="请输入密码" allowClear />
          </Form.Item>
          <Form.Item
            name="cPassword"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value !== form.getFieldValue('password')) return Promise.reject(new Error('两次输入密码不一致'))
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input.Password prefix={<LockOutlined className="color-25" />} placeholder="请再次输入密码" allowClear />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            已有账号,
            <Button type="link" onClick={onLogin}>
              去登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

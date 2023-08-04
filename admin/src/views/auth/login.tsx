import { Button, Card, Form, Input, Space, Checkbox, Modal } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import store, { authSlice } from '@/store'
import { loginApi } from '@/api/auth'
import Styles from './auth.module.less'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = async (values: Record<string, unknown>) => {
    const data = await loginApi.post(values)
    store.dispatch(authSlice.actions.login(data))
    navigate('/')
  }

  const formProps = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
    onFinish,
    form,
    initialValues: { phoneNumber: '18888888888', password: '123456', remember: true }
  }

  const onForget = () => {
    Modal.info({
      title: '提示',
      content: (
        <div>
          <p>重新创建一个账号</p>
          <p>或者</p>
          <p>
            发送账号到作者邮箱
            <Button type="link" className="p-0" href="https://mail.qq.com/" target="_blank">
              (biaov@qq.com)
            </Button>
            重置密码
          </p>
        </div>
      )
    })
  }

  const onRegister = () => {
    navigate('/register')
  }

  return (
    <div className={`${Styles.wrap} w-vw h-vh flex flex-center hidden p-0`}>
      <div className={Styles.title}>生态系统控制台</div>
      <Card title="登录" style={{ width: 380 }}>
        <Form {...formProps}>
          <Form.Item name="phoneNumber" rules={[{ required: true, message: '请输入手机号码' }]}>
            <Input prefix={<UserOutlined className="color-25" />} placeholder="请输入手机号码" allowClear />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined className="color-25" />} placeholder="请输入密码" allowClear />
          </Form.Item>
          <Form.Item>
            <Space className="w-fill flex-sb">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
              <Button type="link" onClick={onForget} className="login-form-forgot p-0">
                忘记密码？
              </Button>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            还没有账号？
            <Button type="link" className="p-0" onClick={onRegister}>
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

import React from 'react'
import { Button, Card, Form, Input, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import store, { counterSlice } from '@/stores'
import styles from './index.module.less'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }
  const onFinish = () => {
    store.dispatch(counterSlice.actions.login())
    navigate('/')
    onReset()
  }

  const formProps = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    onFinish,
    form
  }

  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 }
  }

  return (
    <div className={styles.wrap}>
      <Card title="登录" style={{ width: 500 }}>
        <Form {...formProps}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" allowClear />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" allowClear />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Button htmlType="button" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login

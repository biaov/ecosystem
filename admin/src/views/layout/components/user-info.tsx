import { useState } from 'react'
import { Form, Input, Space, Modal, Avatar, Radio, Row, Col, Alert, message } from 'antd'
import { genderList } from '@/enums'
import store, { authSlice } from '@/store'
import { userApi } from '@/api/user'
import Styles from './user-info.module.less'
import type { EditPwdProps } from './types'

export default function UserInfoComponent({ visible, onChange }: EditPwdProps) {
  const [form] = Form.useForm()
  const onCancel = () => {
    onChange && onChange(false)
  }
  const { userInfo } = store.getState()
  const formProps = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    form,
    initialValues: userInfo
  }

  const handleOk = async () => {
    await form.validateFields()
    const data = await userApi.update(userInfo.id!, form.getFieldsValue())
    store.dispatch(authSlice.actions.setUserInfo(data))
    message.success('修改成功')
    onCancel()
  }

  const [isOpenAvatar, setAvatar] = useState(false)

  const [selectIndex, setSelectIndex] = useState(0)

  const defaultAvatar = ['https://dummyimage.com/300x300/f60', 'https://dummyimage.com/300x300/fc0', 'https://dummyimage.com/300x300/f10']

  const onSubmitAvatar = () => {
    setAvatar(false)
    form.setFieldValue('avatar', defaultAvatar[selectIndex])
  }

  const onClickAvatar = () => {
    const avatar = form.getFieldValue('avatar')
    const index = defaultAvatar.findIndex(item => item === avatar)
    setSelectIndex(index)
    setAvatar(true)
  }

  return (
    <>
      <Modal title="个人信息" okText="提交" width={560} open={visible} onOk={handleOk} onCancel={onCancel}>
        <Row>
          <Col span={24}>
            <Form {...formProps}>
              <Form.Item label="头像" valuePropName="src" name="avatar" required>
                <Avatar size={60} className="cursor-pointer" onClick={onClickAvatar} />
              </Form.Item>
              <Form.Item label="用户昵称" name="nickname" rules={[{ required: true, message: '请输入昵称' }]}>
                <Input placeholder="请输入昵称" maxLength={10} allowClear />
              </Form.Item>
              <Form.Item name="gender" label="用户性别" required>
                <Radio.Group options={genderList.options()}></Radio.Group>
              </Form.Item>
              <Form.Item name="email" label="用户邮箱">
                <Input type="email" placeholder="请输入邮箱" maxLength={40} allowClear />
              </Form.Item>
              <Form.Item name="signature" label="个性签名">
                <Input.TextArea showCount maxLength={50} allowClear autoSize={{ minRows: 4, maxRows: 4 }} placeholder="请输入个性签名" />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      <Modal title="选择头像" width={760} open={isOpenAvatar} onOk={onSubmitAvatar} onCancel={() => setAvatar(false)}>
        <Space direction="vertical" size={20}>
          <Alert message="服务器内存有限，因此不支持上传功能，你可以从以下头像中选择你比较喜欢的😊😊👇👇" type="info" showIcon closable />
          <div></div>
          <Space wrap size={20}>
            {defaultAvatar.map((item, index) => (
              <div key={index} className={`${Styles.avatar} ${index === selectIndex ? Styles.selected : ''}`}>
                <Avatar src={item} size={80} className="cursor-pointer" onClick={() => setSelectIndex(index)} />
              </div>
            ))}
          </Space>
        </Space>
      </Modal>
    </>
  )
}

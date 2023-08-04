import { Card, Row, Col, Avatar, Divider, Space } from 'antd'
import { UserOutlined, MobileOutlined, UserAddOutlined, ManOutlined, UserSwitchOutlined, EditOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { genderList } from '@/enums'
import { randomColors } from '@/utils/function'
import { useRoles } from '@/composables/useData'
import type { AuthState } from '@/store/types'

const colors = randomColors(7)

export default function UserInfoComponent() {
  const userInfo = useSelector(state => (state as AuthState).userInfo)
  const { roleFilter } = useRoles()
  const infoList = [
    {
      icon: UserOutlined,
      title: '用户昵称',
      value: userInfo.nickname
    },
    {
      icon: MobileOutlined,
      title: '手机号码',
      value: userInfo.phoneNumber
    },
    {
      icon: UserAddOutlined,
      title: '用户邮箱',
      value: userInfo.email
    },
    {
      icon: ManOutlined,
      title: '用户性别',
      value: genderList.filter(userInfo.gender)?.label
    },
    {
      icon: UserSwitchOutlined,
      title: '所属角色',
      value: roleFilter(userInfo.roleCode)?.label
    },
    {
      icon: FieldTimeOutlined,
      title: '创建时间',
      value: userInfo.createdAt
    },
    {
      icon: EditOutlined,
      title: '个性签名',
      value: userInfo.signature
    }
  ]
  return (
    <Card title="个人信息">
      <Row justify="center">
        <Avatar src={userInfo.avatar} size={140} />
      </Row>
      <Divider style={{ margin: '24px 0 12px' }} />
      {infoList.map((item, index) => {
        return (
          <div key={index}>
            <Row justify="space-between">
              <Space>
                <item.icon style={{ color: colors[index] }}></item.icon>
                <span>{item.title}</span>
              </Space>
              <Col span={15}>
                <Row justify="end">{item.value || <span className="color-25">暂无</span>}</Row>
              </Col>
            </Row>
            {infoList.length - 1 === index ? '' : <Divider style={{ margin: '16px 0' }} />}
          </div>
        )
      })}
    </Card>
  )
}

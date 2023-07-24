import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Descriptions, Checkbox, Button, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { allPermission } from '@/config/sidebar'
import { roleApi } from '@/api/role'
import type { DataType } from './types'
import Styles from './permission.module.less'

export default function RolePermissionPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [permission, setPermission] = useState<string[]>([])
  const loadData = async () => {
    const data = await roleApi.get<DataType>(+id!)
    setPermission(data.permissions)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Card title="角色权限详情">
      <Space direction="vertical" size={100}>
        <div>
          {allPermission.map(module => (
            <Descriptions key={module.value} title={module.label} column={1} size="default" className={Styles['custom-description']}>
              {module.children?.map(page =>
                page.hidden ? null : (
                  <Descriptions.Item label={page.label} key={page.value} labelStyle={{ color: 'rgba(0,0,0,0.85)' }}>
                    {page.children?.map(item => (
                      <Checkbox key={item.value} checked={permission.includes('*') || permission.includes(item?.value)}>
                        {item?.label}
                      </Checkbox>
                    ))}
                  </Descriptions.Item>
                )
              )}
            </Descriptions>
          ))}
        </div>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>
      </Space>
    </Card>
  )
}

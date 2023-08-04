import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Form, Input, Button, Space, Modal, Table, Cascader, message, Popconfirm } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { allPermission } from '@/config/sidebar'
import { paginationRewrite, cloneDeep, checkPermission } from '@/utils/function'
import { serachTypes } from './enums'
import { roleApi } from '@/api/role'
import type { PagingResponse } from '@/api/types'
import type { DataType } from './types'

export default function RolePage() {
  const [form] = Form.useForm()
  const formProps = {
    form,
    initialValues: { serachType: serachTypes.nickname }
  }
  const [tableData, setTableData] = useState<PagingResponse<DataType>>({
    items: [],
    meta: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  })
  const loadData = async ({ current, pageSize }: TablePaginationConfig = {}) => {
    const filter: Record<string, string | number | undefined> = form.getFieldsValue()

    if (current) {
      filter.current = current
      filter.pageSize = pageSize
    }

    const data = await roleApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [roleForm] = Form.useForm()
  const modalProps = {
    form: roleForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const [role, setRole] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showRoleModal = (item: Partial<DataType> = {}) => {
    roleForm.resetFields()
    if (item.id) {
      setRole({ id: item.id, visible: true })
      const newItem = cloneDeep(item)
      let permissions: string[][] = []
      if (newItem.permissions?.includes('*')) {
        allPermission.forEach(moduleItem => {
          moduleItem.children?.forEach(pageItem => {
            pageItem.children?.forEach(permissItem => {
              permissions.push([moduleItem.value, pageItem.value, permissItem.value])
            })
          })
        })
      } else {
        permissions =
          newItem.permissions?.map(permiss => {
            const result: string[] = []
            const slicePermiss = permiss.split('/')
            slicePermiss.reduce((prev, key, i) => {
              const str = prev + (i ? '/' : '') + key
              result.push(i ? str : '/')
              return str
            }, '')
            result.length > 3 && result.shift()
            return result
          }) ?? []
      }

      roleForm.setFieldsValue({ ...item, permissions })
    } else {
      setRole({ id: undefined, visible: true })
    }
  }

  const handleDelete = async (record: DataType) => {
    await roleApi.delete(record.id)
    loadData()
    message.success('操作成功')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60
    },
    {
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title: '角色编码',
      dataIndex: 'code'
    },
    {
      title: '角色权限',
      dataIndex: 'permissions',
      render: (_, { id }) => <Link to={`/setting/role-permission/${id}`}>权限详情</Link>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size={12}>
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/role/edit')} onClick={() => showRoleModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/role/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/role/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const handleSubmit = async () => {
    await roleForm.validateFields()
    const { name, code, permissions } = roleForm.getFieldsValue()
    const params = { name, code, permissions: permissions.map((item: string[]) => item.at(-1)) }
    role.id ? await roleApi.update(role.id, params) : await roleApi.create(params)
    loadData()
    message.success('操作成功')
    setRole({ ...role, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="name">
              <Input placeholder="请输入角色名称" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={() => loadData()}>
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card
          title="角色权限"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/role/add')} onClick={() => showRoleModal()}>
              新增角色
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={role.id ? '编辑角色' : '新增角色'} open={role.visible} onOk={handleSubmit} onCancel={() => setRole({ ...role, visible: false })}>
        <Form {...modalProps}>
          <Form.Item name="name" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
            <Input placeholder="请输入角色名称,不超过10个字" maxLength={10} />
          </Form.Item>
          <Form.Item name="code" label="角色编码" rules={[{ required: true, message: '请输入角色编码' }]}>
            <Input placeholder="请输入角色编码,不超过10个字" maxLength={10} disabled={!!role.id} />
          </Form.Item>
          <Form.Item name="permissions" label="角色权限" rules={[{ required: true, message: '请选择角色权限' }]}>
            <Cascader options={allPermission} placeholder="操作权限" allowClear showCheckedStrategy={Cascader.SHOW_CHILD} maxTagCount="responsive" multiple />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

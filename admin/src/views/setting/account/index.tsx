import { useState, useEffect } from 'react'
import { Card, Form, Input, Select, Button, Space, Modal, Table, message, Popconfirm } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { userApi, resetUserPwdApi } from '@/api/user'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import { useRoles } from '@/composables/useData'
import { serachTypes } from './enums'
import type { DataType } from './types'

export default function AccountPage() {
  const { roles, roleFilter } = useRoles()
  const [form] = Form.useForm()
  const formProps = {
    form,
    initialValues: {
      serachType: serachTypes.nickname
    }
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
    const { serachType, roleCode, keyword } = form.getFieldsValue()
    const filter: Record<string, string | number | undefined> = { roleCode }
    keyword && (filter[serachType] = keyword)

    if (current) {
      filter.current = current
      filter.pageSize = pageSize
    }

    const data = await userApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [accountForm] = Form.useForm()
  const modalProps = {
    form: accountForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const [account, setAccount] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showAccountModal = (item: Partial<DataType> = {}) => {
    accountForm.resetFields()
    if (item.id) {
      setAccount({ id: item.id, visible: true })
      accountForm.setFieldsValue(item)
    } else {
      setAccount({ id: undefined, visible: true })
    }
  }

  const handleDelete = async ({ id }: DataType) => {
    await userApi.delete(id)
    loadData()
    message.success('删除成功')
  }

  const handleResetPwd = async ({ id }: DataType) => {
    await resetUserPwdApi(id).post()
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
      title: '用户昵称',
      dataIndex: 'nickname'
    },
    {
      title: '手机号码',
      dataIndex: 'phoneNumber',
      render: (_, { phoneNumber }) => phoneNumber && `${phoneNumber.slice(0, 3)}****${phoneNumber.slice(-4)}`
    },
    {
      title: '所属角色',
      dataIndex: 'roleCode',
      render: (_, record) => roleFilter(record.roleCode)?.label
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size={12}>
          <Popconfirm placement="leftTop" title="提示" description="你确定要重置该用户的密码吗?" disabled={!checkPermission('/setting/account/reset-pwd')} onConfirm={() => handleResetPwd(record)}>
            <Button type="link" className="p-0" disabled={!checkPermission('/setting/account/reset-pwd')}>
              重置密码
            </Button>
          </Popconfirm>
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/account/edit')} onClick={() => showAccountModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/account/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/account/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleAccount = async () => {
    await accountForm.validateFields()
    const params = accountForm.getFieldsValue()
    account.id ? await userApi.update(account.id, params) : await userApi.create(params)
    loadData()
    message.success('操作成功')
    setAccount({ ...account, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="keyword">
              <Input
                addonBefore={
                  <Form.Item name="serachType" noStyle>
                    <Select options={serachTypes.options()} />
                  </Form.Item>
                }
                placeholder="请输入关键词"
              />
            </Form.Item>
            <Form.Item name="roleCode">
              <Select options={roles} placeholder="所属角色" allowClear className="w-120" />
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
          title="账户设置"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/account/add')} onClick={() => showAccountModal()}>
              新增账号
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={account.id ? '编辑账号' : '新增账号'} open={account.visible} onOk={handleAccount} onCancel={() => setAccount({ ...account, visible: false })}>
        <Form {...modalProps}>
          <Form.Item name="roleCode" label="所属角色" rules={[{ required: true, message: '请选择所属角色' }]}>
            <Select options={roles} placeholder="请选择所属角色" />
          </Form.Item>
          <Form.Item name="nickname" label="用户昵称" rules={[{ required: true, message: '请输入用户昵称' }]}>
            <Input placeholder="请输入用户昵称" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="手机号码" rules={[{ required: true, message: '请输入手机号码' }]}>
            <Input placeholder="请输入手机号码" disabled={!!account.id} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

import { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, Modal, Table, message, Popconfirm, Select, Tag } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { featureApi } from '@/api/manage'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import type { DataType } from './types'
import { platforms } from './enums'

export default function FeaturePage() {
  const [form] = Form.useForm()
  const formProps = { form }

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

    const data = await featureApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [featureForm] = Form.useForm()
  const modalProps = {
    form: featureForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const [feature, setFeature] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showFeatureModal = (item: Partial<DataType> = {}) => {
    featureForm.resetFields()
    if (item.id) {
      setFeature({ id: item.id, visible: true })
      featureForm.setFieldsValue(item)
    } else {
      setFeature({ id: undefined, visible: true })
    }
  }

  const handleDelete = async ({ id }: DataType) => {
    await featureApi.delete(id)
    loadData()
    message.success('删除成功')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60
    },
    {
      title: '功能名称',
      dataIndex: 'name'
    },
    {
      title: '图标名称',
      dataIndex: 'iconName'
    },
    {
      title: '功能平台',
      dataIndex: 'platforms',
      render: (_, record) => record.platforms.map((item, i) => <Tag key={i}>{platforms.filter(item).label}</Tag>)
    },
    {
      title: '页面路径',
      dataIndex: 'pageUrl'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size={12}>
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/feature/edit')} onClick={() => showFeatureModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/feature/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/feature/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleFeature = async () => {
    await featureForm.validateFields()
    const params = featureForm.getFieldsValue()
    feature.id ? await featureApi.update(feature.id, params) : await featureApi.create(params)
    loadData()
    message.success('操作成功')
    setFeature({ ...feature, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="name">
              <Input placeholder="请输入功能名称" />
            </Form.Item>
            <Form.Item name="platforms">
              <Select mode="multiple" options={platforms.options()} placeholder="功能平台" className="w-140" allowClear maxTagCount="responsive"></Select>
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
          title="功能管理"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/feature/add')} onClick={() => showFeatureModal()}>
              新增功能
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={feature.id ? '编辑功能' : '新增功能'} open={feature.visible} onOk={handleFeature} onCancel={() => setFeature({ ...feature, visible: false })}>
        <Form {...modalProps}>
          <Form.Item name="name" label="功能名称" rules={[{ required: true, message: '请输入功能名称' }]}>
            <Input placeholder="请输入功能名称，不超过6个字" maxLength={6} allowClear />
          </Form.Item>
          <Form.Item name="iconName" label="图标名称" rules={[{ required: true, message: '请输入图标名称' }]}>
            <Input placeholder="请输入图标名称" allowClear />
          </Form.Item>
          <Form.Item name="platforms" label="功能平台" rules={[{ required: true, message: '请选择功能平台' }]}>
            <Select options={platforms.options()} placeholder="请选择功能平台" mode="multiple" allowClear></Select>
          </Form.Item>
          <Form.Item name="pageUrl" label="页面路径" rules={[{ required: true, message: '请输入页面路径' }]}>
            <Input placeholder="请输入页面路径" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

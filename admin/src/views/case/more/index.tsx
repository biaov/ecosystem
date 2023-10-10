import { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, Modal, Table, message, Popconfirm, Image } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { caseMoreApi } from '@/api/case'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import UploadImg from '@/components/upload-img'
import type { DataType } from './types'

export default function CasePage() {
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

    const data = await caseMoreApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [caseForm] = Form.useForm()
  const modalProps = {
    form: caseForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const [caseValue, setCase] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showCaseModal = (item: Partial<DataType> = {}) => {
    caseForm.resetFields()
    if (item.id) {
      setCase({ id: item.id, visible: true })
      caseForm.setFieldsValue({ ...item, coverUrl: [item.coverUrl] })
    } else {
      setCase({ id: undefined, visible: true })
    }
  }

  const handleDelete = async ({ id }: DataType) => {
    await caseMoreApi.delete(id)
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
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'desc'
    },
    {
      title: '封面图',
      dataIndex: 'coverUrl',
      width: 140,
      render: (_, record) => <Image src={record.coverUrl} width={50} />
    },
    {
      title: '页面地址',
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
          <Button type="link" className="p-0" disabled={!checkPermission('/case/more/edit')} onClick={() => showCaseModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/case/more/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/case/more/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleCase = async () => {
    await caseForm.validateFields()
    const values = caseForm.getFieldsValue()
    const params = { ...values, coverUrl: values.coverUrl[0] }
    caseValue.id ? await caseMoreApi.update(caseValue.id, params) : await caseMoreApi.create(params)
    loadData()
    message.success('操作成功')
    setCase({ ...caseValue, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="name">
              <Input placeholder="请输入案例标题" />
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
          title="案例管理"
          extra={
            <Button type="primary" disabled={!checkPermission('/case/more/add')} onClick={() => showCaseModal()}>
              新增案例
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={caseValue.id ? '编辑案例' : '新增案例'} open={caseValue.visible} onOk={handleCase} onCancel={() => setCase({ ...caseValue, visible: false })}>
        <Form {...modalProps}>
          <Form.Item name="name" label="案例名称" rules={[{ required: true, message: '请输入案例标题' }]}>
            <Input placeholder="请输入案例名称，不超过40个字" maxLength={40} />
          </Form.Item>
          <Form.Item name="desc" label="案例描述" rules={[{ required: true, message: '请输入案例内容' }]}>
            <Input placeholder="请输入案例描述，不超过50个字" maxLength={50} />
          </Form.Item>
          <Form.Item name="pageUrl" label="页面路径" rules={[{ required: true, message: '请输入页面路径' }]}>
            <Input placeholder="请输入页面路径" allowClear />
          </Form.Item>
          <Form.Item label="封面图" name="coverUrl" valuePropName="list" rules={[{ required: true, message: '请上传封面图' }]}>
            <UploadImg />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

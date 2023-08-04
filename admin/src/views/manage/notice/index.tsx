import { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, Modal, Table, message, Popconfirm, Switch } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { noticeApi } from '@/api/manage'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import type { DataType } from './types'

export default function NoticePage() {
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

    const data = await noticeApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [noticeForm] = Form.useForm()
  const modalProps = {
    form: noticeForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  }
  const [notice, setNotice] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showNoticeModal = (item: Partial<DataType> = {}) => {
    noticeForm.resetFields()
    if (item.id) {
      setNotice({ id: item.id, visible: true })
      noticeForm.setFieldsValue(item)
    } else {
      setNotice({ id: undefined, visible: true })
    }
  }

  const handleDelete = async ({ id }: DataType) => {
    await noticeApi.delete(id)
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
      title: '公告标题',
      dataIndex: 'title'
    },
    {
      title: '是否展示',
      dataIndex: 'isShow',
      width: 180,
      render: (_, record) => <Switch checked={record.isShow} />
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
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/notice/edit')} onClick={() => showNoticeModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/notice/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/notice/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleNotice = async () => {
    await noticeForm.validateFields()
    const params = noticeForm.getFieldsValue()
    notice.id ? await noticeApi.update(notice.id, params) : await noticeApi.create(params)
    loadData()
    message.success('操作成功')
    setNotice({ ...notice, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="title">
              <Input placeholder="请输入公告标题" />
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
          title="公告管理"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/notice/add')} onClick={() => showNoticeModal()}>
              新增公告
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={notice.id ? '编辑公告' : '新增公告'} open={notice.visible} onOk={handleNotice} onCancel={() => setNotice({ ...notice, visible: false })}>
        <Form {...modalProps}>
          <Form.Item name="title" label="公告标题" rules={[{ required: true, message: '请输入公告标题' }]}>
            <Input placeholder="请输入公告标题，不超过40个字" maxLength={40} />
          </Form.Item>
          <Form.Item name="content" label="公告内容" rules={[{ required: true, message: '请输入公告内容' }]}>
            <Input.TextArea placeholder="请输入公告内容" showCount maxLength={500} autoSize={{ minRows: 10, maxRows: 10 }} />
          </Form.Item>
          <Form.Item name="isShow" label="是否展示" required>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

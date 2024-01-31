import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Space, Table, message, Popconfirm, Badge, Select } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { activityDrawPrizeApi } from '@/api/activity'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import ModalQrcode from '@/components/modal-qrcode'
import { activityStatus } from '@/enums'
import type { DataType } from './types'

export default function CasePage() {
  const navigate = useNavigate()
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

    const data = await activityDrawPrizeApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }

  const handleDelete = async ({ id }: DataType) => {
    await activityDrawPrizeApi.delete(id)
    loadData()
    message.success('删除成功')
  }

  const [modalQrcode, setModalQrcode] = useState({
    visible: false,
    text: ''
  })

  const onShowQrcodeModal = (item: DataType) => {
    setModalQrcode({
      visible: true,
      text: `${import.meta.env.VITE_API_SITE_URL}pages/activity/draw-prize/index?id=${item.id}`
    })
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
      title: '活动时间',
      dataIndex: 'createdAt',
      render: (_, record) => (
        <>
          {record.startTime} ~ {record.endTime}
        </>
      )
    },
    {
      title: '活动状态',
      width: 180,
      render: (_, record) => {
        const { label, status } = activityStatus.filter(record.status)
        return <Badge status={status} text={label} />
      }
    },

    {
      title: '操作',
      key: 'action',
      width: 160,
      render: (_, record) => (
        <Space size={12}>
          <Button type="link" className="p-0" disabled={!checkPermission('/activity/draw-prize/qrcode') || record.status === activityStatus.ended} onClick={() => onShowQrcodeModal(record)}>
            投放二维码
          </Button>
          <Button
            type="link"
            className="p-0"
            disabled={!checkPermission('/activity/draw-prize/edit') || record.status === activityStatus.ended}
            onClick={() => navigate(`/activity/draw-prize/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            className="p-0"
            disabled={!checkPermission('/activity/draw-prize/data') || record.status === activityStatus.noStart}
            onClick={() => navigate(`/activity/draw-prize/data/${record.id}`)}
          >
            数据
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/activity/draw-prize/delete') || record.status !== activityStatus.noStart}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/activity/draw-prize/delete') || record.status !== activityStatus.noStart}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="name">
              <Input placeholder="活动标题" />
            </Form.Item>
            <Form.Item name="status">
              <Select options={activityStatus.options()} placeholder="活动状态" className="w-120" allowClear />
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
          title="抽奖活动"
          extra={
            <Button type="primary" disabled={!checkPermission('/activity/draw-prize/add')} onClick={() => navigate('/activity/draw-prize/add')}>
              新增活动
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData} />
        </Card>
      </Space>

      {/* 二维码 */}
      <ModalQrcode text={modalQrcode.text} visible={modalQrcode.visible} onChange={visible => setModalQrcode({ ...modalQrcode, visible })} />
    </>
  )
}

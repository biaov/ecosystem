import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Space, Table, message, Popconfirm, Image } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { recommendApi } from '@/api/manage'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import type { DataType } from './types'

export default function RecommendPage() {
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

    const data = await recommendApi.paging<DataType>(filter)
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
    await recommendApi.delete(id)
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
      title: '文章标题',
      dataIndex: 'title'
    },
    {
      title: '封面图',
      dataIndex: 'coverUrl',
      render: (_, record) => <Image src={record.coverUrl} height={40}></Image>
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
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/recommend/edit')} onClick={() => navigate(`/manage/recommend/edit/${record.id}`)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/recommend/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/recommend/delete')}>
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
            <Form.Item name="title">
              <Input placeholder="请输入文章标题" />
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
          title="推荐管理"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/recommend/add')} onClick={() => navigate('/manage/recommend/add')}>
              新增推荐
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
    </>
  )
}

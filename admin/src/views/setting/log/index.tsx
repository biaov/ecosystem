import { useState, useEffect } from 'react'
import { Card, Form, Input, Select, Button, Space, Cascader, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { itemOptions } from '@/config/sidebar'
import { logApi } from '@/api/log'
import { paginationRewrite } from '@/utils/function'
import type { PagingResponse } from '@/api/types'
import { serachTypes } from './enums'
import type { DataType } from './types'

export default function LogPage() {
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
    const { serachType, pageKey, keyword } = form.getFieldsValue()
    const filter: Record<string, string | number | undefined> = { pageKey }
    keyword && (filter[serachType] = keyword)
    pageKey && (filter.pageKey = pageKey.at(-1))

    if (current) {
      filter.current = current
      filter.pageSize = pageSize
    }

    const data = await logApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  const onReset = () => {
    form.resetFields()
    loadData()
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60
    },
    {
      title: '操作用户',
      dataIndex: 'nickname',
      width: 160,
      ellipsis: true
    },
    {
      title: '操作页面',
      dataIndex: 'pageKey',
      render: (_, record) => {
        let label = ''
        itemOptions.forEach(item => {
          item.children.forEach(child => {
            child.value === record.pageKey && (label = `${item.label}/${child.label}`)
          })
        })
        return label
      },
      width: 200
    },
    {
      title: '操作内容',
      dataIndex: 'content',
      ellipsis: true
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      width: 180
    }
  ]

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
            <Form.Item name="pageKey">
              <Cascader options={itemOptions} placeholder="操作页面" allowClear className="w-140" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={loadData}>
                  查询
                </Button>
                <Button onClick={onReset}>重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card title="操作日志">
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
    </>
  )
}

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { activityDrawPrizeRecordApi } from '@/api/activity'
import { DataRecordType } from './types'

export default function RecommendDetailPage() {
  const { id } = useParams()

  const [list, setList] = useState<DataRecordType[]>([])

  const loadData = async () => {
    if (!id) return
    const res = await activityDrawPrizeRecordApi.all<DataRecordType[]>({ activityId: id })
    setList(res)
  }
  useEffect(() => {
    loadData()
  }, [])

  const columns: ColumnsType<DataRecordType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '手机号码',
      dataIndex: 'phoneNumber'
    },
    {
      title: '设备ID',
      dataIndex: 'deviceId'
    },
    {
      title: '奖项名称',
      dataIndex: 'holdName',
      width: 200
    }
  ]

  return (
    <Card title="数据">
      <Table rowKey="id" columns={columns} dataSource={list} />
    </Card>
  )
}

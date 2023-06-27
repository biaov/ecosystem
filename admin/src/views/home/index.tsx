import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popconfirm, Table, Tag, Button, Card } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import store, { counterSlice } from '@/stores'
import Styles from './index.module.less'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}
const data: DataType[] = [
  {
    key: '1',
    name: '姓名一',
    age: 32,
    address: '地址一',
    tags: ['高手', '王者']
  },
  {
    key: '2',
    name: '姓名二',
    age: 42,
    address: '地址二',
    tags: ['低星']
  },
  {
    key: '3',
    name: '姓名三',
    age: 32,
    address: '地址三',
    tags: ['菜鸟']
  }
]

const getColor = (tag: string): string => {
  switch (tag) {
    case '高手':
      return 'volcano'
    case '王者':
      return 'geekblue'
    default:
      return 'green'
  }
}

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { token } = store.getState()
  const [dataSourse, setDataSourse] = useState(data)

  const onLogout = () => {
    store.dispatch(counterSlice.actions.logout())
    navigate('/login')
  }
  const onLogin = () => {
    navigate('/login')
  }
  const onRemove = (index: number) => {
    const newData = [...dataSourse]
    index >= 0 && newData.splice(index, 1)
    setDataSourse(newData)
  }
  const columns: ColumnsType<DataType> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) =>
        tags.map(tag => (
          <Tag color={getColor(tag)} key={tag}>
            {tag}
          </Tag>
        ))
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, __, index) => (
        <Popconfirm placement="left" title="提示" description="你确定要删除这条数据吗？" onConfirm={() => onRemove(index)}>
          <Button type="link" danger>
            删除
          </Button>
        </Popconfirm>
      )
    }
  ]

  return (
    <div className={Styles.wrap}>
      <Card
        title="演示列表"
        extra={
          token ? (
            <Button type="primary" danger onClick={onLogout}>
              退出登录
            </Button>
          ) : (
            <Button type="primary" onClick={onLogin}>
              去登录
            </Button>
          )
        }
      >
        <Table dataSource={dataSourse} columns={columns} bordered />
      </Card>
    </div>
  )
}

export default Home

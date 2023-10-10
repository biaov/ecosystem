import { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, Modal, Table, message, Popconfirm, Switch, Image, Select } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { swiperApi } from '@/api/manage'
import type { PagingResponse } from '@/api/types'
import { paginationRewrite, checkPermission } from '@/utils/function'
import { errorImg } from '@/config'
import UploadImg from '@/components/upload-img'
import { showStatus } from '@/enums'
import type { DataType } from './types'

export default function SwiperPage() {
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
    const filter: Record<string, boolean | number | undefined> = form.getFieldsValue()

    if (current) {
      filter.current = current
      filter.pageSize = pageSize
    }

    const data = await swiperApi.paging<DataType>(filter)
    setTableData(data)
  }
  useEffect(() => {
    loadData()
  }, [])
  const onReset = () => {
    form.resetFields()
    loadData()
  }
  const [swiperForm] = Form.useForm()
  const modalProps = {
    form: swiperForm,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    initialValues: {
      isShow: false
    }
  }
  const [swiper, setSwiper] = useState<{ id?: number; visible: boolean }>({ id: undefined, visible: false })
  const showSwiperModal = (item: Partial<DataType> = {}) => {
    swiperForm.resetFields()
    if (item.id) {
      setSwiper({ id: item.id, visible: true })
      swiperForm.setFieldsValue(item)
    } else {
      setSwiper({ id: undefined, visible: true })
    }
  }

  const handleDelete = async ({ id }: DataType) => {
    await swiperApi.delete(id)
    loadData()
    message.success('删除成功')
  }

  const handleSwitchChange = async (isShow: boolean, item: DataType) => {
    await swiperApi.update(item.id, { isShow })
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
      title: 'banner',
      dataIndex: 'url',
      render: (_, record) => <Image src={record.url} height={40} fallback={errorImg} />
    },
    {
      title: '页面地址',
      dataIndex: 'pageUrl'
    },
    {
      title: '是否展示',
      dataIndex: 'isShow',
      width: 180,
      render: (_, record) => <Switch checked={record.isShow} onChange={e => handleSwitchChange(e, record)} />
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
          <Button type="link" className="p-0" disabled={!checkPermission('/setting/swiper/edit')} onClick={() => showSwiperModal(record)}>
            编辑
          </Button>
          <Popconfirm
            placement="leftTop"
            title="提示"
            icon={<InfoCircleOutlined className="color-danger" />}
            description="你确定要删除该数据吗?"
            disabled={!checkPermission('/setting/swiper/delete')}
            onConfirm={() => handleDelete(record)}
          >
            <Button type="link" danger className="p-0" disabled={!checkPermission('/setting/swiper/delete')}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const handleSwiper = async () => {
    await swiperForm.validateFields()
    const params = swiperForm.getFieldsValue()
    const [url] = params.url
    params.url = url
    swiper.id ? await swiperApi.update(swiper.id, params) : await swiperApi.create(params)
    loadData()
    message.success('操作成功')
    setSwiper({ ...swiper, visible: false })
  }

  return (
    <>
      <Space direction="vertical" size={20} className="w-fill">
        <Card>
          <Form {...formProps} layout="inline">
            <Form.Item name="isShow">
              <Select placeholder="是否展示" options={showStatus.options()} className="w-120" />
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
          title="轮播管理"
          extra={
            <Button type="primary" disabled={!checkPermission('/setting/swiper/add')} onClick={() => showSwiperModal()}>
              新增轮播图
            </Button>
          }
        >
          <Table rowKey="id" columns={columns} dataSource={tableData.items} pagination={paginationRewrite(tableData.meta)} onChange={loadData}></Table>
        </Card>
      </Space>
      <Modal title={swiper.id ? '编辑轮播图' : '新增轮播图'} open={swiper.visible} width={576} onOk={handleSwiper} onCancel={() => setSwiper({ ...swiper, visible: false })}>
        <Form {...modalProps}>
          <Form.Item label="banner" name="url" valuePropName="list" rules={[{ required: true, message: '请上传图片地址' }]}>
            <UploadImg />
          </Form.Item>
          <Form.Item name="pageUrl" label="页面地址" rules={[{ required: true, message: '请输入页面地址' }]}>
            <Input placeholder="请输入页面地址" />
          </Form.Item>
          <Form.Item name="isShow" valuePropName="checked" label="是否展示" required>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

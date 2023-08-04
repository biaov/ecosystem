import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, message, Image } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import { randomId } from '@/utils/function'
import { uploadImgApi } from '@/api/common'
import type { Props } from './types'
import Styles from './index.module.less'

/**
 * 上传图片组件
 */
export default function UploadImgComponent(props: Partial<Props>) {
  const { list = [], onChange = () => {} } = props ?? {}
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    const newList: UploadFile[] = list.map(url => ({ uid: randomId(), name: 'image.png', status: 'done', url }))
    setFileList(newList)
  }, [])

  const getEmitList = (originList: UploadFile[]) => originList.filter(item => item.status === 'done').map(({ url }) => url) as string[]

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChange(getEmitList(newFileList))
    setFileList(newFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const onBeforeUpload = (file: RcFile) => {
    if (file.size > 1024 * 1024) {
      message.error('图片大小不能超过1M')
      return false
    }
    return true
  }

  const onCustomRequest: UploadProps['customRequest'] = async ({ file }) => {
    uploadImgApi
      .post<{ url: string }>({ file }, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(({ url }) => {
        fileList.forEach(item => {
          if (item.uid === (file as RcFile).uid) {
            item.url = url
            item.status = 'done'
          }
        })
        onChange(getEmitList(fileList))
        setFileList(fileList)
      })
      .catch(() => {
        message.error('上传失败')
      })
  }

  return (
    <>
      <Upload
        accept="image/png, image/jpeg, image/jpg"
        beforeUpload={onBeforeUpload}
        listType="picture-card"
        customRequest={onCustomRequest}
        fileList={fileList}
        className={Styles['custom-upload']}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title="图片预览" footer={null} onCancel={() => setPreviewOpen(false)}>
        <Image src={previewImage} preview={false} className="w-fill" />
      </Modal>
    </>
  )
}

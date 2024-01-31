import { useEffect, useState } from 'react'
import { Modal, QRCode, Row } from 'antd'
import { Props, FormState } from './types'

/**
 * 二维码模态框组件
 */
export default function modalQrcodeComponent(props: Props) {
  const { visible, text, onChange } = props

  const [formState, setFormState] = useState<FormState>({
    visible: false
  })

  useEffect(() => {
    setFormState({ visible })
  }, [visible])

  const onCancel = () => {
    onChange && onChange(false)
  }

  return (
    <>
      <Modal {...{ onCancel, footer: null, open: formState.visible, title: '二维码' }}>
        <div className="p-tb-40">
          <Row justify="center">
            <QRCode type="svg" value={text || '-'} color="#409eff" />
          </Row>
        </div>
      </Modal>
    </>
  )
}

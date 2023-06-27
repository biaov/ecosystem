/**
 * 加载组件
 */
import { Spin } from 'antd'
import Styles from './index.module.less'

export default function Loading() {
  return (
    <div className={Styles['m-loading']}>
      <Spin tip="加载中..." spinning={true} />
    </div>
  )
}

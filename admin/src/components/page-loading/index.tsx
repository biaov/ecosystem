import { Spin } from 'antd'
import Styles from './index.module.less'

/**
 * 页面加载组件
 */
export default function PageLoadingComponent() {
  return (
    <div className={Styles['m-loading']}>
      <Spin tip="加载中..." spinning={true} />
    </div>
  )
}

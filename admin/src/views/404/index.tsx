import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate('/')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面未找到"
      extra={
        <Button type="primary" onClick={onBack}>
          返回首页
        </Button>
      }
    />
  )
}
export default NotFound

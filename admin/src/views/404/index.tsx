import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const onBack = () => {
    navigate('/')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面未找到，请检查地址是否正确"
      extra={
        <Button type="primary" onClick={onBack}>
          返回首页
        </Button>
      }
    />
  )
}

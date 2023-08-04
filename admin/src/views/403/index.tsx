import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const onBack = () => {
    navigate('/')
  }

  return (
    <Result
      status="403"
      title="403"
      subTitle="权限不足，请联系管理员"
      extra={
        <Button type="primary" onClick={onBack}>
          返回首页
        </Button>
      }
    />
  )
}

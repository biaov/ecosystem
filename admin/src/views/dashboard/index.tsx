import { Row, Col } from 'antd'
import UserInfoComponent from './components/user-info'
import TechnologyStack from './components/technology-stack'

export default function HomePage() {
  return (
    <Row wrap={false} gutter={20}>
      <Col span={8}>
        <UserInfoComponent />
      </Col>
      <Col span={16}>
        <TechnologyStack />
      </Col>
    </Row>
  )
}

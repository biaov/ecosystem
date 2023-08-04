import { Breadcrumb } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import { items } from '@/config/sidebar'

export default function BreadcrumbComponent() {
  const { pathname } = useLocation()

  const breadcrumbNameMap: Record<string, string> = {}
  items().forEach(item => {
    breadcrumbNameMap[item.key] = item.label
    item.children.forEach(({ label, key }) => {
      breadcrumbNameMap[key] = label
    })
  })

  const pathSnippets = pathname.split('/').filter(i => i)

  const extraBreadcrumbItems = pathSnippets
    .filter(item => Number.isNaN(+item))
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

      return {
        key: url,
        title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
      }
    })

  const breadcrumbItems = [
    {
      title: <Link to="/">生态系统控制台</Link>,
      key: 'home'
    }
  ].concat(extraBreadcrumbItems)

  return <Breadcrumb items={breadcrumbItems} />
}

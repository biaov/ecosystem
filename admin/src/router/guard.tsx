import type { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import store from '@/store'

/**
 * 检查登录状态
 */
export const CheckLogin = ({ element, component, ...rest }: Record<string, unknown>) => {
  const { token } = store.getState()
  const { pathname } = useLocation()

  if (token) {
    if (pathname === '/login') return <Navigate to="/" replace />
  } else if (pathname !== '/login') {
    return <Navigate to="/login" replace />
  }

  if (element) return <>{element}</>

  const Component = component as FC

  return <Component {...rest} />
}

/**
 * 检查权限
 */
export const CheckPermission = ({ component, ...rest }: Record<string, unknown>) => {
  const { permissions } = store.getState().userInfo
  const { pathname } = useLocation()

  if (permissions) {
    const hasPermission = permissions.includes('*') || permissions.includes(`${pathname}/list`) || permissions.includes(pathname.replace(/\d+/g, 'detail')) || pathname === '/'
    if (!hasPermission) return <Navigate to="/403" replace />
  }

  const Component = component as FC

  return <Component {...rest} />
}

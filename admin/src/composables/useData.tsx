import { useState, useEffect } from 'react'
import { roleApi } from '@/api/role'
import type { UseRolesParams } from './types'

/**
 * roles 数据
 */
export const useRoles = ({ loading }: UseRolesParams = { loading: true }) => {
  const [roles, setRoles] = useState<Record<string, any>[]>([])

  const loadRoles = async (filter: Record<string, any> = {}) => {
    const data = await roleApi.all<Record<string, any>[]>(filter)
    const newList = data.map(item => ({ ...item, label: item.name, value: item.code }))
    setRoles(newList)
  }

  const roleFilter = (value?: string) => roles.find(item => item.value === value) ?? {}

  useEffect(() => {
    loading && loadRoles()
  }, [])

  return { roles, roleFilter, loadRoles }
}

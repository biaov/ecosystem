<template>
  <c-layout-form @submit="handleSubmit" v-if="!loading">
    <a-card title="分配权限">
      <a-space :size="20" direction="vertical">
        <a-space direction="vertical" v-for="(item, index) in data" :key="index">
          <div>{{ item.name }}</div>
          <a-space direction="vertical" v-if="item.type === MenuTypeEnum.module">
            <div>{{ item.name }}</div>
            <a-checkbox-group v-model:value="item.checked" :options="item.children" :disabled="isDisabled" />
          </a-space>
          <a-checkbox-group v-model:value="item.checked" :options="item.children" :disabled="isDisabled" v-else />
        </a-space>
      </a-space>
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { roleApi, rolePermissionApi, menuApi } from '@/api/permission'
import type { PermissionName } from '@/api/types'
import { MenuTypeEnum } from '../enums'

const { id } = useRoute().params
const isDisabled = ref(false)

const getRolePermission = (list: PermissionName.MenuDataType[], permissions: string[], reduce?: string) =>
  list.map(item => {
    if (item.type === MenuTypeEnum.action) {
      item.value = reduce + item.content
      item.label = item.name
    } else if (item.children?.length) {
      item.children = getRolePermission(item.children, permissions, reduce + (reduce ? ':' : '') + item.content)
      if (item.type === MenuTypeEnum.page) {
        let checked = item.children
        !permissions.includes('*') && (checked = checked.filter(({ value }) => permissions.includes(`${reduce}:${value}`)))
        item.checked = checked.map(({ value }) => value)
      }
    }
    return item
  })

const { data, loading } = useApiRequest<PermissionName.GroupMenuRole[]>(async () => {
  const [roleRes, menuRes] = await Promise.all([roleApi.get<PermissionName.RoleDataType>(+id), menuApi.all<PermissionName.MenuDataType>()])
  isDisabled.value = roleRes.permissions.includes('*')
  const options = getRolePermission(menuRes, roleRes.permissions)
  console.log(options)
  return options
})

const handleSubmit = () => {}
</script>

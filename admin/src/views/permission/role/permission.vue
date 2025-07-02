<template>
  <c-layout-form @submit="handleSubmit" v-if="!loading">
    <a-card title="分配权限">
      <a-space :size="24" direction="vertical">
        <a-space direction="vertical" v-for="(item, index) in data" :key="index">
          <div class="text-base font-bold">{{ item.name }}</div>
          <template v-if="item.type === MenuTypeEnum.module">
            <a-space direction="vertical" :size="16">
              <a-space direction="vertical" v-for="(subItem, subIndex) in item.children" :key="subIndex">
                <div class="font-bold">{{ subItem.name }}</div>
                <a-checkbox-group v-model:value="subItem.checked" :options="subItem.children" :disabled="isDisabled" />
              </a-space>
            </a-space>
          </template>
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
const router = useRouter()
const isDisabled = ref(false)

const getRolePermission = (list: PermissionName.MenuDataType[], permissions: string[], reduce: string = '') =>
  list.map(item => {
    if (item.type === MenuTypeEnum.action) {
      item.value = `${reduce}${reduce ? ':' : ''}${item.content}`
      item.label = item.name
    } else if (item.children?.length) {
      item.children = getRolePermission(item.children, permissions, `${reduce}${reduce ? ':' : ''}${item.content}`)
      if (item.type === MenuTypeEnum.page) {
        let checked = item.children
        !permissions.includes('*') && (checked = checked.filter(({ value }) => permissions.includes(value)))
        item.checked = checked.map(({ value }) => value)
      }
    }
    return item
  })

const { data, loading } = useApiRequest<PermissionName.GroupMenuRole[]>(async () => {
  const [roleRes, menuRes] = await Promise.all([roleApi.get<PermissionName.RoleDataType>(+id), menuApi.all<PermissionName.MenuDataType>()])
  isDisabled.value = roleRes.permissions.includes('*')
  return getRolePermission(menuRes, roleRes.permissions)
})

const getChecked = (list: PermissionName.GroupMenuRole[]): string[] => list.map(item => (item.type === MenuTypeEnum.module ? getChecked(item.children) : item.checked)).flat()
const handleSubmit = async () => {
  const checked = getChecked(data.value)
  await rolePermissionApi(+id).post({ permissions: checked })
  message.success('操作成功')
  router.back()
}
</script>

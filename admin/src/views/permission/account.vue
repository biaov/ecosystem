<template>
  <c-layout-list title="账号设置">
    <template #filter>
      <a-form-item>
        <a-input v-model:value.trim="formState.username" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item>
        <c-role-select v-model="formState.roleId" :role-data="roleData" placeholder="角色" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-button type="primary" @click="onAdd" v-perm="permKey.create">新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="头像" :width="120">
          <template #="{ record }">
            <a-avatar :src="record.avatar" :size="40" />
          </template>
        </a-table-column>
        <a-table-column title="账号" data-index="username" />
        <a-table-column title="昵称" data-index="nickname" />
        <a-table-column title="角色" :width="140">
          <template #="{ record }">
            {{ roleData.find(item => item.id === record.roleId)?.name }}
          </template>
        </a-table-column>
        <a-table-column title="创建时间" data-index="createdAt" :width="200" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" @click="handleResetPwd(record)" v-perm="permKey.reset">重置密码</a-button>
              <a-button type="link" size="small" @click="onEdit(record)" v-perm="permKey.update">编辑</a-button>
              <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(record)">
                <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <account-form v-model:visible="formVisible" v-model="editForm" @ok="setPage()" />
</template>
<script lang="ts" setup>
import { accountApi, roleApi, accountResetPwdApi } from '@/api/permission'
import AccountForm from './components/account-form.vue'

const permKey = definePermission(PermissionKeyEnum.permissionAccount, { reset: 'reset' } as const)

const { data: roleData } = useApiRequest<{ name: string; id: number }[]>(roleApi.all)
const { formState, onRestFormState, resetFormState } = useFormState({
  username: undefined,
  roleId: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  accountApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

interface TableType extends IdDataType {
  username: string
  nickname: string
  roleId: number
}

const [formVisible, setFormVisible] = useState()
const editForm = ref<TableType | null>(null)

const onAdd = () => {
  editForm.value = null
  setFormVisible(true)
}

const onEdit = (item: TableType) => {
  editForm.value = item
  setFormVisible(true)
}

const handleDelete = async (item: IdDataType) => {
  await accountApi.delete(item.id)
  message.success('删除成功')
  setPage()
}

const handleResetPwd = async (item: IdDataType) => {
  await accountResetPwdApi(item.id).post()
  message.success('重置成功')
  setPage()
}
</script>

<template>
  <c-layout-list title="角色权限">
    <template #filter>
      <a-form-item>
        <a-input v-model:value.trim="formState.name" placeholder="名称" />
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
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="唯一值" data-index="code" />
        <a-table-column title="更新时间" data-index="updatedAt" :width="200" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" :href="`/admin/permission/role/${record.id}`" v-perm="permKey.perm">分配权限</a-button>
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
  <edit-form v-model:visible="formVisible" v-model="editForm" @ok="setPage()" />
</template>
<script lang="ts" setup>
import { roleApi } from '@/api/permission'
import EditForm from './form.vue'

const permKey = definePermission('permission:role', { perm: 'permission' })

interface TableType extends IdDataType {}

const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  roleApi.paging({
    ...formState.value,
    current,
    pageSize
  })
)

onRestFormState(setPage)

const [formVisible, setFormVisible] = useState()
const editForm = ref<Partial<TableType> | null>(null)

const onAdd = () => {
  editForm.value = null
  setFormVisible(true)
}

const onEdit = (item: TableType) => {
  editForm.value = item
  setFormVisible(true)
}

const handleDelete = async (item: TableType) => {
  await roleApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>

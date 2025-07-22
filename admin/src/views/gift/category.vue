<template>
  <c-layout-list title="礼品分类">
    <template #extra>
      <a-button type="primary" @click="onAdd" v-perm="permKey.create">新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="排序">
          <template #="{ record }">
            <a-input-number v-model:value="record.sort" :min="1" :max="99" :precision="0" @blur="handleUpdateData(record)" />
          </template>
        </a-table-column>
        <a-table-column title="更新时间" data-index="updatedAt" :width="200" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" @click="onEdit(record)" v-perm="permKey.update">编辑</a-button>
              <a-popconfirm placement="left" :title="`${record.children?.length ? '删除这条数据会把所有的子数据都删除，' : ''}你确定要删除这条数据吗?`" @confirm="handleDelete(record)">
                <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <category-form v-model:visible="formVisible" v-model="editForm" @ok="getData" />
</template>
<script lang="ts" setup>
import { giftCategoryApi } from '@/api/gift'
import CategoryForm from './components/category-form.vue'

const permKey = definePermission(PermissionKeyEnum.giftCategory)

interface TableType extends IdDataType {
  parentId: number
  name: string
  sort: number
}

const { data, getData, loading } = useApiRequest<TableType[]>(giftCategoryApi.all)

const [formVisible, setFormVisible] = useState()
const editForm = ref<Partial<TableType> | null>(null)

const onAdd = (item?: TableType) => {
  editForm.value = null
  setFormVisible(true)
}

const onEdit = (item: TableType) => {
  editForm.value = item
  setFormVisible(true)
}
const handleDelete = async (item: TableType) => {
  await giftCategoryApi.delete(item.id)
  message.success('删除成功')
  getData()
}

const handleUpdateData = async (item: TableType) => {
  await giftCategoryApi.update(item.id, { sort: item.sort })
  message.success('更新成功')
}
</script>

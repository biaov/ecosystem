<template>
  <c-layout-list title="权限标识">
    <template #extra>
      <a-button type="primary" @click="onAdd()">新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="类型">
          <template #="{ record }">
            {{ MenuTypeEnum.filter(record.type)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="内容" data-index="content" />
        <a-table-column title="更新时间" data-index="updatedAt" :width="180" />
        <a-table-column title="操作" :width="200">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" @click="onAdd(record)" v-if="record.type !== MenuTypeEnum.action">新增</a-button>
              <a-button type="link" size="small" @click="onEdit(record)">编辑</a-button>
              <a-button type="link" size="small" danger @click="handleDelete(record)">删除</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <edit-form v-model:visible="formVisible" v-model="editForm" @ok="setPage()" />
</template>
<script lang="ts" setup>
import { menuApi } from '@/api/permission'
import { MenuTypeEnum } from '../enums'
import EditForm from './form.vue'

const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined,
  createdAt: []
})

interface TableType extends TableDataType {
  parentId: number
  type: string
}

const { data, setPage, loading } = usePagingApiRequest<TableType>(({ current, pageSize }) =>
  menuApi.paging({
    ...useTransformQuery(formState, {
      createdAt: 'range'
    }),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const [formVisible, setFormVisible] = useState()
const editForm = ref<Partial<TableType> | null>(null)

const onAdd = (item?: TableType) => {
  editForm.value = {
    parentId: item?.id || 0,
    type: item?.type || MenuTypeEnum.module
  }
  setFormVisible(true)
}

const onEdit = (item: TableType) => {
  editForm.value = item
  setFormVisible(true)
}

const handleDelete = async (item: TableType) => {
  await menuApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>

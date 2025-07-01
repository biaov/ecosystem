<template>
  <c-layout-list title="权限标识">
    <template #extra>
      <a-button type="primary" @click="onAdd()">新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="类型">
          <template #="{ record }">
            {{ MenuTypeEnum.filter(record.type)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="内容" data-index="content" />
        <a-table-column title="更新时间" data-index="updatedAt" :width="180" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-space :size="0">
              <a-button type="link" size="small" @click="onAdd(record)" v-if="record.type !== MenuTypeEnum.action">新增</a-button>
              <a-button type="link" size="small" @click="onEdit(record)">编辑</a-button>
              <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(record)">
                <a-button type="link" size="small" danger>删除</a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <edit-form v-model:visible="formVisible" v-model="editForm" @ok="getData()" />
</template>
<script lang="ts" setup>
import { menuApi } from '@/api/permission'
import { MenuTypeEnum } from '../enums'
import EditForm from './form.vue'

interface TableType extends IdDataType {
  parentId: number
  type: string
}

const { data, getData, loading } = useApiRequest<TableType>(() => menuApi.all())

const [formVisible, setFormVisible] = useState()
const editForm = ref<Partial<TableType> | null>(null)

const onAdd = (item?: TableType) => {
  let type
  switch (item?.type) {
    case MenuTypeEnum.module:
      type = MenuTypeEnum.page
      break
    case MenuTypeEnum.page:
      type = MenuTypeEnum.action
      break
    default:
      type = MenuTypeEnum.module
      break
  }
  editForm.value = {
    parentId: item?.id || 0,
    type
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
  getData()
}
</script>

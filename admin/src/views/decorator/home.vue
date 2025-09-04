<template>
  <c-layout-list title="官网首页">
    <template #extra>
      <a-button type="primary" @click="onEdit()" v-perm="permKey.create">新增横幅</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="展示图">
          <template #="{ record }">
            <a-image :src="record.photo" :width="100" :height="50" />
          </template>
        </a-table-column>
        <a-table-column title="跳转链接" data-index="link" />
        <a-table-column title="操作" :width="180">
          <template #="{ record, index }">
            <a-button type="link" size="small" @click="onEdit(record)" v-perm="permKey.update">编辑</a-button>
            <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(index)">
              <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <modal-home v-model:visible="visible" :form="editForm" @ok="onSubmit" />
</template>
<script lang="ts" setup>
import { homeApi } from '@/api/decorator'
import ModalHome from './components/modal-home.vue'

interface DataType {
  id: number
  photo: string
  link: string
}

const permKey = definePermission(PermissionKeyEnum.decoratorHome)
const { data, getData, loading } = useApiRequest<DataType[]>(homeApi.get)

const [visible, setVisible] = useState(false)
const editForm = ref<DataType | null>(null)

const handleUpdateData = async (value?: DataType[]) => {
  !value && (value = JSON.parse(JSON.stringify(data.value)))
  const param = { value }
  await homeApi.post(param)
  message.success('操作成功')
  getData()
}

const onEdit = (item?: DataType) => {
  editForm.value = item || null
  setVisible(true)
}
const onSubmit = async (value: Partial<DataType>) => {
  const dataClone = JSON.parse(JSON.stringify(data.value))
  if (editForm.value) {
    const index = dataClone.findIndex((item: DataType) => item.id === value.id)
    dataClone.splice(index, 1, value)
  } else {
    dataClone.push(value)
  }
  await handleUpdateData(dataClone)
  setVisible(false)
}
const handleDelete = (index: number) => {
  data.value.splice(index, 1)
  handleUpdateData()
}
</script>

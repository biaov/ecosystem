<template>
  <c-layout-list title="热搜词设置">
    <template #extra>
      <a-button type="primary" v-perm="permKey.create" @click="onAdd">新增热搜词</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="排序">
          <template #="{ record }">
            <a-input-number v-model:value="record.sort" :min="1" :max="99" :precision="0" @blur="handleUpdateData()" />
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="100">
          <template #="{ index }">
            <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(index)">
              <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <a-modal title="新增热搜词" v-model:open="visible" @ok="onSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入名称" :maxlength="10" />
      </a-form-item>
      <a-form-item label="排序" required>
        <a-input-number v-model:value="formState.sort" :min="1" :max="99" placeholder="请输入排序" :precision="0" class="w-full" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { hotkeywordSettingApi } from '@/api/setting'

const permKey = definePermission(PermissionKeyEnum.settingHotkeyword)

let id: number
interface TableType {
  name: string
  sort: number
}
const { data, loading, getData } = useApiRequest<TableType[]>(async () => {
  const res = await hotkeywordSettingApi.get<{ id: number; value: TableType[] }>()
  if (!res) return []
  id = res.id
  return res.value
})

const [visible, setVisible] = useState()
const { formState, setFormRules, validFormState, resetFormState } = useFormState({
  name: '',
  sort: undefined
})
setFormRules({
  name: { required: true, message: '请输入名称' },
  sort: { required: true, message: '请输入排序' }
})

const onAdd = () => {
  resetFormState()
  setVisible(true)
}

const handleUpdateData = async (value?: TableType[]) => {
  !value && (value = JSON.parse(JSON.stringify(data.value)))
  const param = { value }
  await (id ? hotkeywordSettingApi.update(param) : hotkeywordSettingApi.post(param))
  message.success('操作成功')
  getData()
}
const onSubmit = async () => {
  if (!(await validFormState())) return
  const dataClone = JSON.parse(JSON.stringify(data.value))
  dataClone.push({ ...formState.value })
  await handleUpdateData(dataClone)
  setVisible(false)
}

const handleDelete = (index: number) => {
  data.value.splice(index, 1)
  handleUpdateData()
}
</script>

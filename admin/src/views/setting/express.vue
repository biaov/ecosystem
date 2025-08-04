<template>
  <c-layout-list title="物流设置">
    <template #extra>
      <a-button type="primary" v-perm="permKey.create" @click="onAdd">新增物流</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="快递公司" data-index="label" />
        <a-table-column title="快递编码" data-index="value" />
        <a-table-column title="操作" :width="180">
          <template #="{ record, index }">
            <a-button type="link" size="small" @click="onEdit(record)">编辑</a-button>
            <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="onDelete(index)">
              <a-button type="link" size="small" danger v-perm="permKey.delete">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}物流`" @ok="onSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="快递公司" required>
        <a-input v-model:value="formState.label" placeholder="请输入快递公司" />
      </a-form-item>
      <a-form-item label="快递编码" required>
        <a-input v-model:value="formState.value" placeholder="请输入快递编码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { expressSettingApi } from '@/api/setting'

const permKey = definePermission(PermissionKeyEnum.settingExpress)

let id: number
interface TableType extends IdDataType {
  label?: string
  value?: string
  [key: string]: unknown
}
const { data, loading, getData } = useApiRequest<TableType[]>(async () => {
  const res = await expressSettingApi.get<{ id: number; value: TableType[] }>()
  if (!res) return []
  id = res.id
  return res.value
})

const [visible, setVisible] = useState()
const { formState, setFormRules, validFormState, resetFormState, setFormState } = useFormState<TableType>({
  id: 0,
  label: undefined,
  value: undefined
})
setFormRules({
  label: { required: true, message: '请输入快递公司' },
  value: { required: true, message: '请输入快递编码' }
})

const onAdd = () => {
  resetFormState()
  setVisible(true)
}

const onEdit = (item: TableType) => {
  setFormState(item)
  setVisible(true)
}

const handleUpdateData = async (value?: TableType[]) => {
  !value && (value = JSON.parse(JSON.stringify(data.value)))
  const param = { value }
  await (id ? expressSettingApi.update(param) : expressSettingApi.post(param))
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

const onDelete = (index: number) => {
  data.value.splice(index, 1)
  handleUpdateData()
}
</script>

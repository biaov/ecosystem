<template>
  <c-layout-list title="弹窗广告设置">
    <template #extra>
      <a-button type="primary" v-perm="permKey.create" @click="onAdd">新增广告</a-button>
    </template>
    <template #list>
      <a-table :data-source="data" row-key="id" :loading="loading" :pagination="false">
        <a-table-column title="展示图">
          <template #="{ record }">
            <a-image :src="record.photo" :width="50" :height="50" />
          </template>
        </a-table-column>
        <a-table-column title="弹窗类型">
          <template #="{ record }">
            {{ advType.filter(record.type)?.label }}
          </template>
        </a-table-column>
        <a-table-column title="弹窗类型">
          <template #="{ record }">{{ record.startShowTime }} ~ {{ record.endShowTime || '永久显示' }}</template>
        </a-table-column>
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
  <a-modal v-model:open="visible" :title="`${formState.id ? '编辑' : '新增'}弹窗广告`" @ok="onSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="展示图" required>
        <c-upload v-model="formState.photo" />
      </a-form-item>
      <a-form-item label="弹窗类型" required>
        <a-select v-model:value="formState.type" :options="advType.options()" placeholder="请选择弹窗类型" />
      </a-form-item>
      <a-form-item label="开始时间" required>
        <a-date-picker v-model:value="formState.startShowTime" show-time value-format="YYYY-MM-DD HH:mm:ss" class="w-full" />
      </a-form-item>
      <a-form-item label="结束时间">
        <a-date-picker v-model:value="formState.endShowTime" show-time value-format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间，不填为永久" class="w-full" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { advSettingApi } from '@/api/setting'
import { advType } from './enums'

const permKey = definePermission(PermissionKeyEnum.settingAdv)

let id: number
interface TableType extends IdDataType {
  type: string
  photo?: string
  startShowTime?: string
  endShowTime?: string
  [key: string]: unknown
}
const { data, loading, getData } = useApiRequest<TableType[]>(async () => {
  const res = await advSettingApi.get<{ id: number; value: TableType[] }>()
  if (!res) return []
  id = res.id
  return res.value
})

const [visible, setVisible] = useState()
const { formState, setFormRules, validFormState, resetFormState, setFormState } = useFormState<TableType>({
  id: 0,
  type: advType.everyday,
  photo: undefined,
  startShowTime: undefined,
  endShowTime: undefined
})
setFormRules({
  type: { required: true, message: '请选择弹窗类型' },
  photo: { required: true, message: '请上传展示图' },
  startShowTime: {
    required: true,
    message: '请选择展示时间',
    validator: (value?: string) => {
      const { endShowTime } = formState.value
      if (endShowTime && dayjs(value) > dayjs(endShowTime)) return Promise.reject('开始时间不能大于结束时间')
      return Promise.resolve()
    }
  }
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
  await (id ? advSettingApi.update(param) : advSettingApi.post(param))
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

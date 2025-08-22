<template>
  <c-layout-form cancel-text="" ok-text="">
    <a-card title="隐私协议">
      <a-space direction="vertical" :size="20">
        <a-input v-model:value="formState.title" placeholder="请输入协议标题" allow-clear />
        <c-rich-text v-model="formState.content" placeholder="请输入协议内容" height="calc(100vh - 376px)" />
      </a-space>
    </a-card>
    <template #button>
      <a-button type="primary" @click="handleSubmit" v-perm="[permKey.create, permKey.update]">保存</a-button>
    </template>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { protocolSettingApi } from '@/api/setting'

const permKey = definePermission(PermissionKeyEnum.settingProtocol)
const { formState, setFormState, setFormRules, validFormState } = useFormState({
  id: 0,
  title: '',
  content: ''
})

const { getData } = useApiRequest(async () => {
  const res = await protocolSettingApi.get<{ id: number; value: { title: string; content: string } } | null>()
  if (!res) return
  setFormState({ id: res.id, ...res.value })
})

setFormRules({
  title: { required: true, message: '请输入标题' },
  content: { required: true, message: '请输入内容' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const { title, content } = formState.value
  const param = { value: { title, content } }
  await (formState.value.id ? protocolSettingApi.update(param) : protocolSettingApi.post(param))
  message.success('保存成功')
  getData()
}
</script>

<template>
  <c-layout-form cancel-text="" ok-text="">
    <a-card title="拉黑设置">
      <a-form-item label="拉黑原因" required>
        <a-textarea v-model:value="formState.reason" placeholder="请输入黑名单原因，每行一个" v-bind="$config.textarea" />
      </a-form-item>
    </a-card>
    <template #button>
      <a-button type="primary" @click="handleSubmit" v-perm="[permKey.create, permKey.update]">保存</a-button>
    </template>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { userSettingApi } from '@/api/setting'

const permKey = definePermission(PermissionKeyEnum.settingUser)
const { formState, setFormState, setFormRules, validFormState } = useFormState({
  id: 0,
  reason: ''
})

const { getData } = useApiRequest(async () => {
  const res = await userSettingApi.get<{ id: number; value: string[] } | null>()
  if (!res) return
  setFormState({ id: res.id, ...useTransfromTextarea.transfromToForm({ reason: res.value }, ['reason']) })
})

setFormRules({
  reason: {
    required: true,
    message: '请输入拉黑原因',
    validator(value: string) {
      const reason = value.split('\n').filter(item => item.trim())
      formState.value.reason = reason.join('\n')
      if (!reason.length) return Promise.reject('请输入拉黑原因')
      if ([...new Set(reason)].length !== reason.length) return Promise.reject('拉黑原因不能重复')
      return Promise.resolve(true)
    }
  }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const param = { value: useTransfromTextarea.transfromToData(formState.value, ['reason'], ['reason']).reason }
  await (formState.value.id ? userSettingApi.update(param) : userSettingApi.post(param))
  message.success('保存成功')
  getData()
}
</script>

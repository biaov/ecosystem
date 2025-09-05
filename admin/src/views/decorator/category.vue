<template>
  <c-layout-form cancel-text="" ok-text="">
    <a-card title="官网分类">
      <a-form-item label="展示横幅" required>
        <c-upload v-model="formState.banner" />
      </a-form-item>
    </a-card>
    <template #button>
      <a-button type="primary" @click="handleSubmit" v-perm="[permKey.create, permKey.update]">保存</a-button>
    </template>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { categoryApi } from '@/api/decorator'

const permKey = definePermission(PermissionKeyEnum.decoratorCategory)
const { formState, setFormState, setFormRules, validFormState } = useFormState({
  banner: ''
})

const { getData } = useApiRequest(async () => {
  const res = await categoryApi.get<{ banner: string } | null>()
  if (!res) return
  setFormState(res)
})

setFormRules({
  banner: { required: true, message: '请上传展示横幅' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await categoryApi.post({ value: { banner: formState.value.banner } })
  message.success('保存成功')
  getData()
}
</script>

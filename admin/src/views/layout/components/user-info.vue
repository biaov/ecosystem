<template>
  <a-modal v-model:open="visible" title="编辑用户信息" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="头像" required>
        <c-upload v-model:value="formState.avatar" />
      </a-form-item>
      <a-form-item label="昵称" required>
        <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
      </a-form-item>
      <a-form-item label="性别" required>
        <a-select v-model:value="formState.gender" :options="genderEnum.options()" placeholder="请选择性别" />
      </a-form-item>
      <a-form-item label="邮箱" required>
        <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { userApi } from '@/api/user'
import { useStore } from '@/stores'
import { genderEnum } from '@/enums'

const { state } = useStore()
const visible = defineModel<boolean>('visible', { default: false })
const { formState, setFormRules, validFormState, setFormState } = useFormState({
  avatar: '',
  nickname: '',
  gender: 2,
  email: ''
})

setFormRules({
  avatar: { required: true, message: '请上传头像' },
  nickname: { required: true, message: '请输入昵称' },
  gender: { required: true, message: '请选择性别' },
  email: useValidEmailForm(true)
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  userApi.update(state.userInfo!.id, formState.value)
  message.success('操作成功')
  visible.value = false
}

watch(visible, value => {
  if (!value) return
  const { nickname, avatar, email, gender } = state.userInfo!
  setFormState({ nickname, avatar, email, gender })
})
</script>

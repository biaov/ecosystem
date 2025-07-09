<template>
  <a-modal v-model:open="visible" title="修改信息" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="手机号">
        <a-input :model-value="userInfo.mobile" disabled />
      </a-form-item>
      <a-form-item label="角色">
        <c-role-select :model-value="userInfo.roleId" disabled />
      </a-form-item>
      <a-form-item label="头像" required>
        <c-upload v-model="formState.avatar" />
      </a-form-item>
      <a-form-item label="昵称" required>
        <a-input v-model:value="formState.nickname" placeholder="请输入昵称" allow-clear />
      </a-form-item>
      <a-form-item label="性别" required>
        <a-select v-model:value="formState.gender" :options="genderEnum.options()" placeholder="请选择性别" allow-clear />
      </a-form-item>
      <a-form-item label="邮箱" required>
        <a-input v-model:value="formState.email" placeholder="请输入邮箱" allow-clear />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { userAdminApi } from '@/api/user'
import { UserInfo } from '@/stores/types'
import { genderEnum } from '@/enums'

const emit = defineEmits<{
  (event: 'ok'): void
}>()

const { state, login } = useStore()
const visible = defineModel<boolean>('visible', { default: false })
const userInfo = computed(() => state.userInfo! || {})
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
  const userInfo = await userAdminApi.update<UserInfo>(state.userInfo!.id, formState.value)
  login({ ...userInfo, token: state.token! })
  message.success('操作成功')
  visible.value = false
  emit('ok')
}

watch(
  visible,
  value => {
    if (!value) return
    const { nickname, avatar, email, gender } = state.userInfo!
    setFormState({ nickname, avatar, email, gender })
  },
  { immediate: true }
)
</script>

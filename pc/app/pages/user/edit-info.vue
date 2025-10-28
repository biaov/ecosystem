<template>
  <!-- 用户信息  -->
  <div class="flex flex-col gap-24 w-400 mx-auto">
    <h3 class="text-xl font-bold mb-20">编辑用户信息</h3>
    <div class="flex items-center">
      <div class="w-100 before:content-['*'] before:text-red-500 before:mr-4">头像</div>
      <c-upload v-model="formState.avatar" title="点击上传头像">
        <img :src="formState.avatar" alt="avatar" class="w-120 h-120 rounded-full" title="点击上传头像" />
      </c-upload>
    </div>
    <div class="flex items-center">
      <div class="w-100 shrink-0 before:content-['*'] before:text-red-500 before:mr-4">昵称</div>
      <me-input v-model="formState.nickname" placeholder="请输入您的昵称" maxlength="12" />
    </div>
    <div class="flex items-center">
      <div class="w-100 before:content-['*'] before:text-red-500 before:mr-4">邮箱</div>
      <div class="text-base text-gray-400">{{ formState.email }}</div>
    </div>
    <div class="flex items-center">
      <div class="w-100 before:content-['*'] before:text-red-500 before:mr-4">手机号</div>
      <div class="text-base text-gray-400">{{ formState.mobile || '未绑定' }}</div>
    </div>
    <div class="flex items-center">
      <div class="w-100 before:content-['*'] before:text-red-500 before:mr-4">性别</div>
      <div class="text-base">
        <me-radio-group v-model="formState.gender" class="flex gap-40">
          <me-radio v-for="item in genderEnum.options()" :key="item.value" :value="item.value" :name="item.value" class="cursor-pointer">{{ item.label }}</me-radio>
        </me-radio-group>
      </div>
    </div>
    <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]! w-full mt-20" @click="handleSubmit">提交</me-button>
  </div>
</template>

<script lang="ts" setup>
import { userApi } from '@/api/user'

const router = useRouter()
const { updateUserInfo, state } = useStore()

const { formState, setFormRules, validFormState } = useFormState({
  ...state.userInfo
})
setFormRules({
  avatar: { required: true, message: '请上传头像' },
  nickname: { required: true, message: '请输入您的昵称' },
  gender: { required: true, message: '请选择性别' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  const { avatar, nickname, gender } = formState.value
  useToastRequest(
    () => userApi.update<UserInfo>({ avatar, nickname, gender }),
    res => {
      updateUserInfo(res)
      router.replace('/user')
    }
  )
}
</script>

<template>
  <!-- layout -->
  <div class="flex w-full h-full overflow-hidden">
    <!-- 菜单栏 -->
    <side-bar v-model:collapsed="isCollapsed" />
    <div class="flex-grow w-0 flex flex-col">
      <!-- 头部 -->
      <div class="flex justify-between items-center h-48 px-24 relative z-10 shadow-[0 1px 4px rgba(0, 21, 41, 0.08)]">
        <bread-crumb />
        <a-space size="large">
          <span class="user-name text-[#333]">欢迎您，{{ adminName }}</span>
          <a-button type="link" title="修改密码" @click="onEditPwd">
            <template #icon>
              <u-ant-icon name="LockOutlined" />
            </template>
          </a-button>
          <a-button type="link" title="退出登录" @click="logout">
            <template #icon>
              <u-ant-icon name="PoweroffOutlined" />
            </template>
          </a-button>
        </a-space>
      </div>
      <!-- 主体 -->
      <div class="relative flex-grow w-full h-0 bg-gray-200 overflow-x-scroll overflow-y-auto">
        <div class="w-full h-full p-24 overflow-y-auto" :style="`min-width:${minWidth};`">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <!-- 修改密码 -->
  <a-modal v-model:open="pwdOpen" title="修改密码" @ok="handleSubmit">
    <a-form>
      <a-form-item label="原始密码" required>
        <a-input v-model:value.trim="formState.opassword" placeholder="请输入原始密码" />
      </a-form-item>
      <a-form-item label="新设密码" required>
        <a-input-password v-model:value.trime="formState.password" placeholder="请输入新设密码" />
      </a-form-item>
      <a-form-item label="确认密码" required>
        <a-input-password v-model:value.trime="formState.cpassword" placeholder="请再次输入新设密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts">
import { message } from 'ant-design-vue'
import { updatePasswordApi } from '@/api/user'
import SideBar from './components/side-bar.vue'
import BreadCrumb from './components/bread-crumb.vue'

const { logout } = useStore()
const isCollapsed = ref(false)
const minWidth = computed(() => `${isCollapsed.value ? 1200 : 1080}px`)
const { formState, resetFormState, setFormRules, validFormState } = useFormState({
  opassword: '',
  password: '',
  cpassword: ''
})

setFormRules({
  opassword: { required: true, message: '请输入原始密码' },
  password: { required: true, message: '请输入新设密码' },
  cpassword: { required: true, message: '请再次输入新设密码' }
})

const adminName = ref('') // 用户名称
// 设置页面信息
const setWebInfo = () => {
  adminName.value = (useStore().state.userInfo?.nickname as string | undefined) || ''
}

setWebInfo()
onBeforeRouteUpdate(setWebInfo)

const [pwdOpen, setPwdOpen] = useState()

// 点击修改密码
const onEditPwd = () => {
  resetFormState()
  setPwdOpen(true)
}
// 点击修改密码模态框确认按钮
const handleSubmit = async () => {
  if (!(await validFormState())) return
  await updatePasswordApi.post(formState.value)
  setPwdOpen(false)
  message.success('密码修改成功')
}
</script>

<template>
  <!-- layout -->
  <div class="flex w-full h-full overflow-hidden">
    <!-- 菜单栏 -->
    <side-bar v-model:collapsed="isCollapsed" />
    <div class="flex-grow w-0 flex flex-col">
      <!-- 头部 -->
      <div class="flex justify-between items-center h-60 px-24 relative z-10 shadow-sm shadow-gray-200">
        <bread-crumb />
        <a-space>
          <div class="user-name text-[#333]" title="修改信息">
            欢迎您，
            <a-button type="link" class="p-0" @click="setUserInfoOpen(true)">{{ adminName }}</a-button>
          </div>
          <a-button type="text" title="修改密码" @click="setPwdOpen(true)">
            <template #icon>
              <c-ant-icon name="LockOutlined" />
            </template>
          </a-button>
          <a-button type="text" title="全屏浏览" @click="onScreen">
            <template #icon>
              <c-ant-icon :name="isFullScreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'" />
            </template>
          </a-button>
          <a-button type="text" title="退出登录" @click="logout">
            <template #icon>
              <c-ant-icon name="PoweroffOutlined" />
            </template>
          </a-button>
        </a-space>
      </div>
      <!-- 主体 -->
      <div class="relative flex-grow w-full h-0 bg-gray-100 overflow-x-scroll overflow-y-auto">
        <div class="w-full h-full p-24 overflow-y-auto" :style="`min-width:${minWidth};`">
          <router-view />
        </div>
      </div>
    </div>
  </div>
  <c-reload-prompt />
  <user-info v-model:visible="userInfoOpen" />
  <edit-pwd v-model:visible="pwdOpen" />
</template>
<script setup lang="ts">
import SideBar from './components/side-bar.vue'
import BreadCrumb from './components/bread-crumb.vue'
import UserInfo from './components/user-info.vue'
import EditPwd from './components/edit-pwd.vue'

const { logout } = useStore()
const isCollapsed = ref(false)
const minWidth = computed(() => `${isCollapsed.value ? 1200 : 1080}px`)

const adminName = ref('') // 用户名称
// 设置页面信息
const setWebInfo = () => {
  adminName.value = (useStore().state.userInfo?.nickname as string | undefined) || ''
}

setWebInfo()
onBeforeRouteUpdate(setWebInfo)

const [pwdOpen, setPwdOpen] = useState()

const [userInfoOpen, setUserInfoOpen] = useState()

const isFullScreen = ref(false)
const onScreen = () => {
  isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen()
  isFullScreen.value = !isFullScreen.value
}
</script>

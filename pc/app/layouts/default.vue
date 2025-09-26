<template>
  <div class="flex flex-col w-full h-full overflow-y-auto page-scroll" @scroll="onScroll" ref="scrollNode">
    <div class="h-80 shrink-0" v-if="route.path !== '/'"></div>
    <!-- 头部信息 -->
    <header class="header fixed top-0 left-0 w-full h-80 z-10 flex justify-between px-[5%] bg-[rgba(0,0,0,0.02)] duration-500" :class="{ white: route.path !== '/' }">
      <NuxtLink to="/" class="flex! items-center">
        <img src="/logo.svg" alt="logo" class="w-40 cursor-pointer" title="回到首页" />
      </NuxtLink>
      <nav class="flex text-white navbar">
        <div class="px-12 cursor-pointer font-bold hover:text-primary relative group h-full flex items-center" v-for="(item, index) in navbar" :key="index">
          <c-dropdown :list="item.children || []" class="h-full" dropdown-class="top-70 left-0 w-240">
            <NuxtLink :to="item.path" v-if="item.path" :target="item.path.includes('http') ? '_blank' : '_self'">{{ item.label }}</NuxtLink>
            <span v-else>{{ item.label }}</span>
          </c-dropdown>
        </div>
      </nav>
      <div class="h-full">
        <c-dropdown :list="userDropdownList" v-if="isLogin" class="h-full" dropdown-class="top-70 right-0 w-200">
          <NuxtLink to="/user">
            <img :src="state.userInfo?.avatar" alt="avatar" class="w-40 h-40 rounded-full object-cover" />
          </NuxtLink>
        </c-dropdown>
        <NuxtLink class="text-white cursor-pointer text-sm hover:underline flex! items-center h-full login-text" to="/login" v-else>登录</NuxtLink>
      </div>
    </header>
    <!-- 内容区域 -->
    <main class="flex-1">
      <slot></slot>
    </main>
    <!-- 底部信息 -->
    <footer class="py-20 bg-white text-center text-info text-xs flex flex-col items-center gap-12">
      <div class="flex justify-center items-center">
        <div v-for="(item, index) in qrcodeList" :key="index" class="flex flex-col items-center justify-center">
          <img :src="item.url" alt="公众号" class="w-100 h-100" />
          <span class="text-info text-xs">{{ item.label }}</span>
        </div>
      </div>
      <p class="flex justify-center gap-12">
        <template v-for="(item, index) in navbar" :key="index">
          <template v-if="index !== 0">|</template>
          <NuxtLink :to="item.path" :target="$formatter.linkTarget(item.path)" class="hover:text-primary" v-if="item.path">{{ item.label }}</NuxtLink>
          <span v-else>{{ item.label }}</span>
        </template>
      </p>
      <p>版权所有@biaov</p>
      <a href="https://beian.miit.gov.cn" target="_blank" class="text-info hover:text-primary">湘ICP备18022869号-2</a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const navbar = Object.freeze([
  {
    label: '首页',
    path: '/'
  },
  {
    label: '分类',
    path: '/category'
  },
  {
    label: '购物车',
    path: '/cart'
  },
  {
    label: '案例集锦',
    path: 'https://biaov.cn/',
    children: [
      {
        label: '组件库 mine-h5-ui',
        path: 'https://mineh5ui.biaov.cn/v2/',
        antIcon: 'MediumSquareFilled'
      },
      {
        label: '特效集锦 effects',
        path: 'https://effects.biaov.cn/',
        antIcon: 'CodeSandboxCircleFilled'
      },
      {
        label: '博客 wordpress',
        path: 'https://wordpress.biaov.cn/',
        antIcon: 'BookFilled'
      },
      {
        label: '桌面软件项目 mine-desktop',
        path: 'https://github.com/biaov/mine-desktop',
        antIcon: 'GithubFilled'
      },
      {
        label: '多命令简化 mine-auto-cli',
        path: 'https://github.com/biaov/mine-auto-cli',
        antIcon: 'RobotFilled'
      },
      {
        label: '初始化项目 create-mine',
        path: 'https://github.com/biaov/create-mine',
        antIcon: 'GoldenFilled'
      }
    ]
  },
  {
    label: '源码地址',
    path: 'https://github.com/biaov/ecosystem'
  },
  {
    label: '关于我们',
    path: '/aboutus'
  }
])
const qrcodeList = Object.freeze([{ label: '微信公众号', url: 'https://biaov.cn/static/official-account.jpg' }])
const { state, isLogin } = useStore()
const userDropdownList = useUserSidebar()
const { onScroll } = useScrollStore()
</script>
<style lang="less" scoped>
.header {
  &:hover,
  &.white {
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .login-text,
    .navbar {
      color: #333;
    }
  }
}
</style>

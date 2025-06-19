<template>
  <!-- 菜单栏 -->
  <div class="m-side-bar">
    <router-link to="/" class="u-logo" title="回到首页">
      <img src="/logo.svg" alt="LOGO" class="w-60" />
    </router-link>
    <a-menu v-model:selectedKeys="menuState.selectedKeys" :open-keys="menuState.openKeys" theme="white" mode="inline" :inline-collapsed="isCollapsed" @open-change="onMenuOpenChange">
      <template v-for="item in listData">
        <a-sub-menu v-if="!item.hidden" :key="item.path">
          <template #icon>
            <uc-ant-icon :name="item.meta.antIcon" v-if="item.meta.antIcon" />
          </template>
          <template #title>
            {{ item.meta.title }}
          </template>
          <template v-for="it in item.children">
            <a-menu-item v-if="!it.hidden" :key="it.name" @click="menuClick(it)">
              {{ it.meta.title }}
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
    <div class="u-menu-fold">
      <div class="u-icon" @click="onCollapsed">
        <uc-ant-icon :name="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { menuRoutes } from '@/router/routes'

const props = defineProps({
  // 收缩状态
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:collapsed'])
const router = useRouter()
const listData = ref(menuRoutes)

const isCollapsed = ref(props.collapsed) // 是否收缩
const sidebarWidth = computed(() => `${isCollapsed.value ? 80 : 200}px`) // 宽度

const onCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

const menuClick = menuItem => {
  router.push({ name: menuItem.name })
}

// 只展开当前菜单
const menuState = reactive({
  rootSubmenuKeys: listData,
  openKeys: [],
  selectedKeys: []
})

const onMenuOpenChange = openKeys => {
  if (openKeys.length) {
    const latestOpenKey = openKeys.find(key => menuState.openKeys.indexOf(key) === -1)
    if (menuState.rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      menuState.openKeys = openKeys
    } else {
      menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }
}
</script>
<style scoped lang="less">
.m-side-bar {
  position: relative;
  z-index: 10;
  width: v-bind(sidebarWidth);
  height: 100%;
  padding-bottom: 100px;
  background: #001529;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.2s;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  .u-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 64px;
    background: #002140;
    margin-bottom: 20px;
    overflow: hidden;
    img {
      width: 100px;
    }
  }
  :deep(.ant-menu-submenu) {
    .ant-menu-submenu-title .ant-menu-item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 20px;
      font-size: 18px;
      .anticon {
        font-size: inherit;
      }
    }
    .u-svg {
      color: inherit;
    }
  }

  .u-menu-fold {
    // position: absolute;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: v-bind(sidebarWidth);
    height: 60px;
    background: #001529;
    color: #fff;
    transition: width 200ms;
    .u-icon {
      width: 80px;
      text-align: center;
      font-size: 20px;
      :deep(.uc-ant-icon) {
        color: rgba(255, 255, 255, 0.8) !important;
      }

      cursor: pointer;
      &:hover {
        :deep(.uc-ant-icon) {
          color: #fff !important;
        }
      }
    }
  }
}
</style>

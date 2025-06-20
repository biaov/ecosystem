<template>
  <!-- 菜单栏 -->
  <div class="h-full flex flex-col transition-200 transition-[width] z-10 shadow-xl shadow-gray-300" :style="{ width: sidebarWidth }">
    <router-link to="/" class="flex justify-center items-center h-80" title="回到首页">
      <img src="/logo.svg" class="w-40" />
    </router-link>
    <div class="flex-grow h-0 overflow-auto">
      <a-menu v-model:selected-keys="menuState.selectedKeys" v-model:open-keys="menuState.openKeys" :items="items" mode="inline" :inline-collapsed="isCollapsed" />
    </div>
    <div class="p-24">
      <a-button type="link" @click="onCollapsed">
        <template #icon>
          <u-ant-icon :name="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" type="primary" class="text-xl" />
        </template>
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createVNode } from 'vue'
import type { RouteRecordRaw, RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import { menuRoutes } from '@/router/routes'
import UAntIcon from '@/components/u-ant-icon.vue'

const props = defineProps({
  // 收缩状态
  collapsed: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:collapsed'])
const router = useRouter()

const menuClick = (menuItem: RouteRecordRaw) => {
  router.push({ name: menuItem.name })
}

const items = menuRoutes
  .map(item => {
    if (item.meta?.hidden) return
    return {
      key: item.path,
      icon: item.meta?.antIcon ? createVNode(UAntIcon, { name: item.meta.antIcon }) : null,
      label: item.meta?.title,
      children: item.children
        ? item.children
            .map(child => {
              if (child.meta?.hidden) return
              return {
                key: child.name,
                label: child.meta?.title,
                onClick: menuClick.bind(null, child)
              }
            })
            .filter(Boolean)
        : null,
      onClick: menuClick.bind(null, item)
    }
  })
  .filter(Boolean)

const isCollapsed = ref(props.collapsed) // 是否收缩
const sidebarWidth = computed(() => `${isCollapsed.value ? 80 : 200}px`) // 宽度

const onCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
  emit('update:collapsed', isCollapsed.value)
}

// 只展开当前菜单
const menuState = reactive({
  openKeys: [] as string[],
  selectedKeys: [] as string[]
})

const getKey = (list: typeof items, name: string) =>
  list.some(item => {
    if (!item) return
    if (item.key === name) {
      menuState.selectedKeys = [name]
      return true
    } else if (item.children?.length) {
      const child = getKey(item.children as typeof items, name)
      if (!child) return
      menuState.openKeys = [item.key]
      return true
    }
  })

const handleRoute = ({ name }: RouteLocationNormalizedLoadedGeneric) => {
  if (!name) return
  getKey(items, name as string)
}

handleRoute(useRoute())
onBeforeRouteUpdate(handleRoute)
</script>

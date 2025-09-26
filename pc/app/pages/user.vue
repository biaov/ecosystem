<template>
  <!-- 用户 -->
  <div class="p-24">
    <div class="w-[90%] mx-auto flex gap-24">
      <div class="w-300 shrink-0 bg-white p-48 text-base font-bold">
        <div
          class="py-24 flex items-center gap-12 hover:text-primary cursor-pointer"
          :class="{ 'text-primary': routePath === item.path }"
          v-for="(item, index) in sidebar"
          :key="index"
          @click="onClickSidebar(item)"
        >
          <c-ant-icon :name="item.antIcon" v-if="item.antIcon" />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div class="flex-1 bg-white p-48">
        <h2 class="text-3xl font-bold text-center mb-24" v-if="sidebarName">{{ sidebarName }}</h2>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()
const sidebar = useUserSidebar()
const onClickSidebar = (item: (typeof sidebar)[number]) => {
  if (item.path) {
    router.push(item.path)
  } else if (item.action) {
    item.action()
  }
}
const routePath = ref<string>(useRoute().path)
onBeforeRouteUpdate(({ path }) => {
  routePath.value = path
})
const sidebarName = computed(() => sidebar.find(item => item.path === routePath.value)?.label)
</script>

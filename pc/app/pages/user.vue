<template>
  <!--  -->
  <div class="w-[90%] mx-auto flex gap-24">
    <sidebar class="w-300 shrink-0 bg-white rounded-xl">
      <div class="px-12 py-10 flex gap-10 hover:text-primary cursor-pointer" v-for="(item, index) in sidebar" :key="index" @click="onClickSidebar(item)">
        <c-ant-icon :name="item.antIcon" v-if="item.antIcon" />
        <span>{{ item.label }}</span>
      </div>
    </sidebar>
    <main class="flex-1 bg-white rounded-xl">
      <router-view />
    </main>
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
</script>

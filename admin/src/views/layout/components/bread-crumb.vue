<template>
  <!-- 面包屑导航 -->
  <a-breadcrumb class="bread-crumb">
    <a-breadcrumb-item>
      <router-link to="/" class="line">首页</router-link>
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in crumbList" :key="item.path">
      {{ item.meta.title }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script lang="ts" setup>
const routes = ref(useRoute())
onBeforeRouteUpdate(to => {
  routes.value = to
})
const crumbList = computed(() => routes.value.matched.filter(item => item.path !== '/'))
</script>
<style scoped lang="less">
// .bread-crumb {
// :deep(span:last-child > .ant-breadcrumb-link) {
//   color: rgba(0, 0, 0, 0.65);
// }
// }
</style>

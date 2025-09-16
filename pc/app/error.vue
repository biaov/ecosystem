<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <div class="p-48">
    <h1 class="mb-12">{{ error.message }}</h1>
    <a href="https://github.com/biaov/ecosystem/issues" target="_blank"
      class="hover:text-primary hover:underline">网页出问题了，去联系管理员...</a>
    <!-- <NuxtLink to="/" class="transition text-white px-12 py-6 bg-primary hover:bg-primary fixed top-[5%] left-[90%] -translate-[50%] ">返回首页</NuxtLink> -->
  </div>
</template>
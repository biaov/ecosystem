<template>
  <web-view :src="webviewUrl"></web-view>
</template>

<script setup lang="ts">
const webviewUrl = ref('')

onLoad(option => {
  if (!option) return
  webviewUrl.value = decodeURIComponent(option.url)
})
</script>

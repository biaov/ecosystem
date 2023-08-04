<style scoped lang="less">
@import './index.less';
</style>
<template>
  <view class="wrap">
    <image class="logo" src="/static/logo.svg" />
    <button @click="onLogin">登录</button>
  </view>
</template>

<script setup lang="ts">
import { useHandle } from './hooks'

const { onLogin } = useHandle()
</script>

<style scoped lang="less">
@import './index.less';
</style>
<template>
  <view class="wrap">
    <image class="logo" src="/static/logo.svg" />
    <view class="space">版本：{{ packageInfo.version }}</view>
    <button class="space" @click="onExit" v-if="store.token">退出登录</button>
    <button class="space" @click="onNavToLogin" v-else>去登录</button>
    <button @click="handleTest">测试请求</button>
  </view>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { useHandle, useApiTest } from './hooks'

const store = useStore()
const { onNavToLogin, onExit } = useHandle()
const { packageInfo, handleTest } = useApiTest()
</script>

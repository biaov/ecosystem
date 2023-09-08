<style scoped lang="less">
@import './form.less';
</style>
<template>
  <view class="form">
    <image class="logo" src="/static/logo.svg" mode="widthFix" />
    <view class="form-item">
      <input type="text" v-model="formState.phoneNumber" placeholder="请输入手机号码" class="input" placeholder-class="input-placeholder" />
    </view>
    <view class="form-item">
      <input type="password" v-model="formState.password" placeholder="请输入密码" class="input" placeholder-class="input-placeholder" />
    </view>
    <view class="btn btn-primary" @click="handleLogin">登录</view>
    <view class="p-t-30" @click="onRegister">
      还没有账号，去
      <text class="color-primary">注册</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useLogin } from './hooks'

const { formState, handleLogin, onRegister } = useLogin()
</script>

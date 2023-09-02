<template>
  <view class="p-30">
    <view v-for="(item, index) in btns" :key="index" class="m-b-40">
      <button :open-type="item.openType" class="btn btn-primary m-b-20" @getphonenumber="item.callback" @getuserinfo="item.callback" @chooseavatar="item.callback">{{ item.name }}</button>
      <view class="color-45">结果：</view>
      <view class="m-b-40">
        <image v-if="item.openType === 'chooseAvatar'" :src="item.value" class="w-100 h-80" mode="widthFix"></image>
        <view v-else>
          {{ item.value }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const btns = ref([
  {
    name: '获取手机号',
    openType: 'getPhoneNumber',
    value: '',
    callback: (e: Record<string, any>) => {
      btns.value[0].value = e.detail.errMsg
    }
  },
  {
    name: '获取用户信息',
    openType: 'getUserInfo',
    value: '',
    callback: (e: Record<string, any>) => {
      btns.value[1].value = JSON.stringify(e.detail)
    }
  },
  {
    name: '获取用户头像',
    openType: 'chooseAvatar',
    value: '',
    callback: (e: Record<string, any>) => {
      btns.value[2].value = e.detail.avatarUrl
    }
  }
])
</script>

<style scoped lang="less"></style>

<template>
  <view class="color-45 flex flex-column flex-cc p-t-100">
    <image src="/static/icon/no-data.svg" mode="widthFix" class="w-200 m-b-20"></image>
    <text>{{ placeholder }}</text>
  </view>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    /**
     * 占位符文案
     */
    placeholder?: string
  }>(),
  {
    placeholder: '暂无数据'
  }
)
</script>

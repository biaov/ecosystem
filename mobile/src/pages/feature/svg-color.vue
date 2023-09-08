<template>
  <view class="p-30">
    <input type="text" v-model="customColor" placeholder="请输入16进制颜色值，按键盘完成键修改颜色" class="input m-b-40" placeholder-class="input-placeholder" @confirm="onFinish" />
    <view class="p-40 flex flex-cc">
      <SvgImg src="/static/icon/no-data.svg" :colors="showColor" width="200rpx" height="200rpx"></SvgImg>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 自定义颜色
 */
const customColor = ref('')
/**
 * 显示颜色
 */
const showColor = ref<string[]>([])
/**
 * 软键盘完成按钮
 */
const onFinish = () => {
  showColor.value = [`#${customColor.value}`]
}
</script>

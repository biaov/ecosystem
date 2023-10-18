<script setup lang="ts">
/**
 * 响应事件
 */
const emit = defineEmits<{
  (event: 'update:visible', e: boolean): void
}>()

/**
 * 所需参数
 */
const props = withDefaults(
  defineProps<{
    /**
     * 显示状态
     */
    visible?: boolean

    /**
     * 背景颜色
     */
    background?: string

    /**
     * 禁止点击遮罩层关闭弹窗
     */
    disabled?: boolean
  }>(),
  {
    visible: false,
    background: 'rgba(0,0,0,0.6)',
    disabled: false
  }
)

/**
 * 关闭遮罩层
 */
const onClose = () => {
  !props.disabled && emit('update:visible', false)
}
</script>

<template>
  <!-- 遮罩层 -->
  <view v-if="visible" class="view-mask fixed w-fill h-fill" :style="{ background }" @click="onClose" @touchmove.stop.prevent>
    <slot></slot>
  </view>
</template>

<style lang="less" scoped>
.view-mask {
  top: 0;
  left: 0;
  z-index: 99;
}
</style>

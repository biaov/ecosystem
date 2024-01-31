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

const instance = getCurrentInstance()

/**
 * 关闭遮罩层
 */
const onClose = () => {
  !props.disabled && emit('update:visible', false)
}

const animation = uni.createAnimation({
  duration: 300,
  timingFunction: 'ease'
})
const showMask = ref(false)
const opacityAnimation = ref(null)

const getNode = (selector: string) =>
  new Promise((resolve, reject) => {
    nextTick(() => {
      uni
        .createSelectorQuery()
        .in(instance)
        .select(selector)
        .boundingClientRect(data => {
          if (!data) {
            setTimeout(() => {
              getNode(selector).then(resolve).catch(reject)
            }, 200)
          } else {
            resolve(data)
          }
        })
        .exec()
    })
  })

const onShowMask = async () => {
  showMask.value = true
  await getNode('.view-mask')
  animation.opacity(1).step()
  opacityAnimation.value = animation.export()
}
const onHideMask = () => {
  if (!showMask.value) return
  animation.opacity(0).step()
  opacityAnimation.value = animation.export()
  nextTick(() => {
    setTimeout(() => {
      showMask.value = false
      onClose()
    }, 300)
  })
}

watch(
  () => props.visible,
  value => {
    value ? onShowMask() : onHideMask()
  },
  {
    immediate: true
  }
)
</script>

<template>
  <!-- 遮罩层 -->
  <view v-if="showMask" class="view-mask fixed w-fill h-fill" :animation="opacityAnimation" :style="{ background }" @click="onClose" @touchmove.stop.prevent>
    <slot></slot>
  </view>
</template>

<style lang="less" scoped>
.view-mask {
  top: 0;
  left: 0;
  z-index: 99;
  opacity: 0;
  transform: opacity 0.3s;
  &.show {
    opacity: 1;
  }
}
</style>

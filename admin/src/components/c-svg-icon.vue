<template>
  <svg class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
// const arr = import.meta.glob('@/assets/svgs/*.svg', { eager: true })
const props = withDefaults(
  defineProps<{
    name: string
    size?: string
    rotate?: number
    color?: string
  }>(),
  {
    size: '20px',
    rotate: 0,
    color: '#ccc'
  }
)

const symbolId = computed(() => `#${props.name}`)
const cssRotate = computed(() => `rotate(${props.rotate}deg)`)
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  color: v-bind(color);
  transform: v-bind(cssRotate);
  font-size: v-bind(size);
}
</style>

<template>
  <svg class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string }>()
const symbolId = computed(() => `#${props.name}`)
</script>

<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>

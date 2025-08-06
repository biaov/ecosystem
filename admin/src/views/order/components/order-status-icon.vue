<template>
  <!-- 订单状态图标 -->
  <svg viewBox="0 0 76.43 76.43" width="120px" height="120px" class="order-status-icon absolute right-24 top-24">
    <circle class="cls-1" cx="38.22" cy="38.22" r="37" />
    <circle class="cls-2" cx="38.22" cy="38.22" r="31" />
    <path class="cls-3" d="M45.18,57.09A19,19,0,0,1,20,37" />
    <path class="cls-3" d="M32,21.47A19,19,0,0,1,57.76,41" />
    <text class="cls-4" transform="matrix(0.8, 0.59, -0.59, 0.8, 16.92, 28.85)">{{ item?.label }}</text>
    <polygon class="cls-5" points="41.35 10.79 41.93 12.54 43.7 13.06 42.21 14.15 42.27 15.99 40.77 14.91 39.04 15.54 39.6 13.78 38.47 12.32 40.31 12.31 41.35 10.79" />
    <polygon class="cls-5" points="54.64 16.03 54.27 17.84 55.54 19.17 53.71 19.37 52.84 20.99 52.08 19.31 50.27 18.98 51.63 17.74 51.38 15.92 52.98 16.83 54.64 16.03" />
    <polygon class="cls-5" points="63.54 27.22 62.31 28.59 62.75 30.38 61.06 29.64 59.49 30.61 59.68 28.78 58.27 27.59 60.07 27.19 60.77 25.49 61.7 27.08 63.54 27.22" />
    <polygon class="cls-5" points="65.64 41.35 63.89 41.93 63.38 43.7 62.29 42.21 60.45 42.27 61.52 40.77 60.9 39.04 62.66 39.6 64.11 38.47 64.12 40.31 65.64 41.35" />
    <polygon class="cls-5" points="35.08 65.64 34.51 63.89 32.74 63.38 34.22 62.29 34.17 60.45 35.66 61.52 37.4 60.9 36.84 62.66 37.96 64.11 36.12 64.12 35.08 65.64" />
    <polygon class="cls-5" points="21.79 60.4 22.16 58.6 20.89 57.27 22.72 57.06 23.6 55.44 24.35 57.12 26.17 57.45 24.8 58.69 25.05 60.52 23.45 59.6 21.79 60.4" />
    <polygon class="cls-5" points="12.9 49.22 14.13 47.84 13.69 46.05 15.37 46.79 16.94 45.82 16.76 47.66 18.16 48.85 16.36 49.24 15.66 50.95 14.74 49.35 12.9 49.22" />
    <polygon class="cls-5" points="10.79 35.08 12.54 34.51 13.06 32.74 14.15 34.22 15.99 34.17 14.91 35.66 15.54 37.4 13.78 36.84 12.32 37.96 12.31 36.12 10.79 35.08" />
  </svg>
</template>

<script lang="ts" setup>
import { saleOrderStatusEnum } from '../enums'

const props = defineProps<{
  status: string
}>()

const item = computed(() => saleOrderStatusEnum.filter(props.status))
const color = computed(() => item.value?.color)
</script>
<style lang="less" scoped>
.order-status-icon {
  .cls-1,
  .cls-2,
  .cls-3 {
    fill: none;
    stroke: v-bind(color);
    stroke-miterlimit: 10;
  }
  .cls-1 {
    stroke-width: 2.43px;
  }
  .cls-2 {
    stroke-width: 1.5px;
  }
  .cls-4 {
    font-size: 15.83px;
    font-family:
      PingFang-SC-Medium,
      PingFang SC;
    font-weight: 500;
  }
  .cls-4,
  .cls-5 {
    fill: v-bind(color);
  }
}
</style>

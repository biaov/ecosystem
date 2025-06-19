<template>
  <!-- 动态设置 ant-design-vue 图标 -->
  <component :is="CurIcon" />
</template>

<script lang="ts" setup>
import { createVNode } from 'vue'
import * as icons from '@ant-design/icons-vue'

const props = withDefaults(
  defineProps<{
    name: string
    type?: string // primary|success|info|warning|danger|disabled|white
    background?: string
    rotate?: number
    color?: string
  }>(),
  {
    type: '',
    background: '',
    rotate: 0,
    color: ''
  }
)
const CurIcon = computed(() => createVNode((icons as Record<string, any>)[props.name], { class: ['cur-icon', props.type] }))
const propsBackground = computed(() => props.background)
const propsRotate = computed(() => props.rotate)
const propsColor = computed(() => props.color)
</script>
<style lang="less">
@type: {
  primary: @color-primary;
  success: @color-success;
  info: @color-info;
  warning: @color-warning;
  danger: @color-danger;
  disabled: @color-disabled;
  white: @color-white;
};

.cur-icon {
  display: block !important;
  each(@type, {
    &.@{key} {
      color: @value !important;
    }
  });
  svg {
    background: v-bind(propsBackground);
    transform: rotate(v-bind(propsRotate));
    color: v-bind(propsColor);
  }
}
</style>

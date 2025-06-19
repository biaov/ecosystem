<template>
  <!-- 动态设置 ant-design-vue 图标 -->
  <component :is="CurIcon" />
</template>

<script lang="ts" setup>
import * as icons from '@ant-design/icons-vue'

const props = defineProps({
  // 名称
  name: {
    type: String,
    required: true
  },
  // 类型
  type: {
    type: String,
    default: '' // primary|success|info|warning|danger|disabled|white
  },
  background: {
    type: String,
    default: ''
  },
  rotate: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: ''
  }
})
const CurIcon = computed(() => createVNode(icons[props.name], { class: ['cur-icon', props.type] }))
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

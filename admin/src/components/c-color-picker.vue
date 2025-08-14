<template>
  <!-- 颜色选择器  -->
  <me-color-picker v-model:value="colorValue" />
</template>

<script lang="ts" setup>
import { MeColorPicker } from 'mine-h5-ui'
import 'mine-h5-ui/styles/MeColorPicker.css'

const modelValue = defineModel<string>()

const colorValue = ref('')

nextTick(() => {
  watch(colorValue, value => {
    modelValue.value = value
  })
})
</script>

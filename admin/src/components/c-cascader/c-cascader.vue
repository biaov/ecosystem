<template>
  <!-- 地址选择器 -->
  <a-cascader v-model:value="modelValue" :options="cityOptions" v-bind="{ ...$attrs, placeholder, showSearch, fieldNames }" @change="onChange" />
</template>
<script lang="ts" setup>
import cityOptions from './city'

withDefaults(defineProps<{ placeholder?: string; showSearch?: boolean; fieldNames?: Record<string, string> }>(), {
  placeholder: '请选择所在城市',
  showSearch: true,
  fieldNames: () => ({ value: 'label' })
})

const province = defineModel<string>('province')
const city = defineModel<string>('city')
const district = defineModel<string>('district')
const modelValue = ref<string[]>([])

const onChange = (val?: string[]) => {
  if (val) {
    const [provinceVal, cityVal, districtVal] = val
    province.value = provinceVal
    city.value = cityVal
    district.value = districtVal
  } else {
    province.value = ''
    city.value = ''
    district.value = ''
  }
}
watch(
  () => [province.value, city.value, district.value],
  vals => {
    modelValue.value = vals.some(val => !val) ? [] : (vals as string[])
  },
  { immediate: true }
)
</script>

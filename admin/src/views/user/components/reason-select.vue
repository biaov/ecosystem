<template>
  <!-- 原因选择器 -->
  <a-select v-model:value="modelValue" :options="data" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { userSettingApi } from '@/api/setting'

const { data } = useApiRequest(async () => {
  const res = await userSettingApi.get<{ value: string[] }>()
  if (!res) return []
  return res.value.map(value => ({ label: value, value }))
}, true)

const modelValue = defineModel<string>()
</script>

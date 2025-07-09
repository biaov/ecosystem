<template>
  <!-- 原因选择器 -->
  <a-select v-model:value="modelValue" :options="data ? data.value.reason.map(value => ({ label: value, value })) : []" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { userSettingApi } from '@/api/setting'

const { data } = useApiRequest<{ value: { reason: string[] } }>(userSettingApi.get, true, null)

const modelValue = defineModel<string>()
</script>

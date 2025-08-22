<template>
  <!-- 角色选择器 -->
  <a-select v-model:value="modelValue" :options="roleData" v-bind="$attrs" :field-names="{ label: 'name', value: 'id' }" />
</template>

<script lang="ts" setup>
import { roleApi } from '@/api/permission'

const props = defineProps<{
  roleData?: { name: string; id: number }[]
}>()

const { data, getData } = useApiRequest<{ name: string; id: number }[]>(roleApi.all, false)
const roleData = computed(() => props.roleData || data.value)
!props.roleData && getData()

const modelValue = defineModel<number>()
</script>

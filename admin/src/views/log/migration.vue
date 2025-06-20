<template>
  <c-layout-list title="迁移日志">
    <template #filter>
      <a-form-item>
        <a-input v-model:value.trim="formState.name" placeholder="标题" />
      </a-form-item>
      <a-form-item>
        <a-range-picker v-model:value="formState.createdAt" show-time value-format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra></template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="标题" data-index="title" ellipsis />
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { migrationApi } from '@/api/log'

const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined,
  createdAt: []
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  migrationApi.paging({
    ...useTransformQuery(formState, {
      name: 'like',
      createdAt: 'range'
    }),
    current,
    pageSize
  })
)

onRestFormState(setPage)
</script>

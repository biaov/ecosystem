<template>
  <c-layout-list title="操作日志">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="operationSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入内容" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-range-picker v-model:value="formState.createdAt" :placeholder="['开始时间', '结束时间']" show-time value-format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="操作人" data-index="nickname" :width="160" />
        <a-table-column title="操作模块" data-index="module" :width="200" />
        <a-table-column title="操作内容" data-index="content" ellipsis />
        <a-table-column title="操作IP" data-index="ip" :width="180" />
        <a-table-column title="操作时间" data-index="createdAt" :width="180" />
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { operationApi } from '@/api/log'
import { operationSearchEnum } from './enum'

const { formState, onRestFormState, resetFormState } = useFormState({
  type: operationSearchEnum.nickname,
  keyword: '',
  createdAt: []
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) => {
  return operationApi.paging({
    ...useTransformQuery(formState, { createdAt: 'range' }, 'search'),
    current,
    pageSize
  })
})

onRestFormState(setPage)
</script>

<template>
  <c-layout-list title="权限标识">
    <template #extra>
      <a-button>新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="[{ children: [{}] }, { children: [{}] }]" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="权限名称" data-index="name" />
        <a-table-column title="权限内容" data-index="content" />
        <a-table-column title="更新时间" data-index="updatedAt" :width="180" />
        <a-table-column title="操作" :width="200">
          <template #="row">
            {{ row }}
            <a-space :size="0">
              <a-button type="link" size="small">新增</a-button>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { menuApi } from '@/api/permission'
import { MenuTypeEnum } from './enums'

const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined,
  createdAt: []
})

const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  menuApi.paging({
    ...useTransformQuery(formState, {
      createdAt: 'range'
    }),
    current,
    pageSize
  })
)

onRestFormState(setPage)
</script>

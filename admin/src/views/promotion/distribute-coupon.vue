<template>
  <c-layout-list title="手动发券">
    <template #filter>
      <a-form-item>
        <a-input-group compact>
          <a-select v-model:value="formState.type" :options="distributeCouponSearchEnum.options()" />
          <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-button type="primary" href="/promotion/distribute-coupon-add" v-perm="permKey.create">新增手动发券</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="主题" data-index="title" />
        <a-table-column title="用户">
          <template #="{ record }">
            <div v-for="(value, index) in record.range" :key="index">{{ value }}</div>
          </template>
        </a-table-column>
        <a-table-column title="发放" data-index="send" />
        <a-table-column title="核销" data-index="used" />
        <a-table-column title="过期" data-index="expired" />
        <a-table-column title="创建时间" data-index="createdAt" :width="180" />
        <a-table-column title="操作" :width="120">
          <template #="{ record }">
            <a-button type="link" size="small" :href="`/promotion/distribute-coupon-detail/${record.id}`" v-perm="permKey.list">详情</a-button>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { distributeCouponApi } from '@/api/coupon'
import { distributeCouponSearchEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.promotionDistribute)
const { formState, onRestFormState, resetFormState } = useFormState({
  type: distributeCouponSearchEnum.title,
  keyword: undefined
})
const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  distributeCouponApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)
</script>

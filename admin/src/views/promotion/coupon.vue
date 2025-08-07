<template>
  <c-layout-list title="优惠券">
    <template #filter>
      <a-form-item>
        <a-input v-model:value.trim="formState.name" placeholder="优惠券名称" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.type" :options="couponTypeEnum.options()" placeholder="优惠券类型" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-button type="primary" href="/promotion/coupon-add" v-perm="permKey.create">新增</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="编码" data-index="code" />
        <a-table-column title="名称" data-index="name" />
        <a-table-column title="发放" data-index="send" />
        <a-table-column title="核销" data-index="used" />
        <a-table-column title="过期" data-index="expired" />
        <a-table-column title="创建时间" data-index="createdAt" :width="180" />
        <a-table-column title="操作" :width="180">
          <template #="{ record }">
            <a-button type="link" size="small" :href="`/promotion/coupon-data/${record.id}`" v-perm="permKey.list">数据</a-button>
            <a-button type="link" size="small" :href="`/promotion/coupon-edit/${record.id}`" v-perm="permKey.update">编辑</a-button>
            <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(record)" v-if="!record.send">
              <a-button type="link" size="small" :href="`/promotion/coupon-edit/${record.id}`" danger v-perm="permKey.delete">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { couponApi } from '@/api/coupon'
import { couponTypeEnum } from './enums'

const permKey = definePermission(PermissionKeyEnum.promotionList)
const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined,
  type: undefined
})
const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  couponApi.paging({
    ...formState.value,
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleDelete = async (item: IdDataType) => {
  await couponApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>

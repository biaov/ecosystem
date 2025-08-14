<template>
  <c-layout-list title="手动发券">
    <template #filter>
      <a-form-item>
        <a-input v-model:value.trim="formState.name" placeholder="请输入活动名称" />
      </a-form-item>
      <a-form-item>
        <a-select v-model:value="formState.status" :options="activityStatusEnum.options()" placeholder="活动状态" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="setPage">查询</a-button>
        <a-button @click="resetFormState">重置</a-button>
      </a-form-item>
    </template>
    <template #extra>
      <a-button type="primary" href="/promotion/activity-coupon-add" v-perm="permKey.create">新增活动发券</a-button>
    </template>
    <template #list>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="活动名称" data-index="name" />
        <a-table-column title="活动时间">
          <template #="{ record }">{{ record.startTime }} ~ {{ record.endTime }}</template>
        </a-table-column>
        <a-table-column title="发放" data-index="send" />
        <a-table-column title="核销" data-index="used" />
        <a-table-column title="过期" data-index="expired" />
        <a-table-column title="活动状态" :width="180">
          <template #="{ record }">
            <a-badge :color="activityStatusEnum.filter(record.status)?.color" :text="activityStatusEnum.filter(record.status)?.label" status="processing" />
          </template>
        </a-table-column>
        <a-table-column title="操作" :width="120">
          <template #="{ record }">
            <a-button type="link" size="small" :href="`/promotion/activity-coupon-edit/${record.id}`" v-perm="permKey.update">编辑</a-button>
            <a-popconfirm placement="left" title="你确定要删除这条数据吗?" @confirm="handleDelete(record)" v-if="record.status === activityStatusEnum.notStart">
              <a-button type="link" size="small" :href="`/promotion/activity-coupon-edit/${record.id}`" danger v-perm="permKey.delete">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </a-table>
    </template>
  </c-layout-list>
</template>
<script lang="ts" setup>
import { activityCouponApi } from '@/api/coupon'
import { activityStatusEnum } from '@/enums'

const permKey = definePermission(PermissionKeyEnum.promotionActivity)
const { formState, onRestFormState, resetFormState } = useFormState({
  name: undefined,
  status: undefined
})
const { data, setPage, loading } = usePagingApiRequest(({ current, pageSize }) =>
  activityCouponApi.paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)

const handleDelete = async (item: IdDataType) => {
  await activityCouponApi.delete(item.id)
  message.success('删除成功')
  setPage()
}
</script>

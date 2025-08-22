<template>
  <a-space direction="vertical" :size="24" class="w-full" v-if="!couponLoading">
    <a-card title="数据总览">
      <a-row>
        <a-col :span="6">
          <a-statistic title="发放人数" :value="couponData.userCount" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="发放数量" :value="couponData.send" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="核销数量" :value="couponData.used" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="使用转化率" :value="couponData.send && (couponData.used / couponData.send) * 100" :precision="2" suffix="%" />
        </a-col>
      </a-row>
    </a-card>
    <a-card title="发放记录">
      <template #extra>
        <a-space class="pb-12">
          <a-input-group compact class="w-400">
            <a-select v-model:value="formState.type" :options="couponDataSearchEnum.options()" />
            <a-input v-model:value.trim="formState.keyword" placeholder="请输入关键词" style="width: 75%" @blur="setPage()" />
          </a-input-group>
          <a-select v-model:value="formState.status" :options="couponStatusEnum.options()" placeholder="持券状态" allow-clear class="w-120" @change="setPage()" />
        </a-space>
      </template>
      <a-table :data-source="data.items" row-key="id" :loading="loading" :pagination="$formatter.pagination(data)" @change="setPage">
        <a-table-column title="优惠券码" :data-index="['coupon', 'code']" />
        <a-table-column title="用户昵称" :data-index="['user', 'nickname']" />
        <a-table-column title="手机号码" :data-index="['user', 'mobile']" />
        <a-table-column title="发放时间" data-index="createdAt" :width="180" />
        <a-table-column title="持券状态" :width="180">
          <template #="{ record }">
            <a-badge :color="couponStatusEnum.filter(record.status)?.color" :text="couponStatusEnum.filter(record.status)?.label" :status="couponStatusEnum.filterStatus(record.status)" />
          </template>
        </a-table-column>
      </a-table>
    </a-card>
  </a-space>
</template>
<script lang="ts" setup>
import { couponStatisticInfoApi, couponStatisticApi } from '@/api/coupon'
import { couponStatusEnum, couponDataSearchEnum } from './enums'
import type { CouponName } from '@/api/types'

interface TableType extends IdDataType {
  status: string
}

const { id } = useRoute().params
const { formState, onRestFormState } = useFormState({
  type: couponDataSearchEnum.nickname,
  keyword: '',
  status: undefined
})

const { data, setPage, loading } = usePagingApiRequest<TableType>(({ current, pageSize }) =>
  couponStatisticApi(+id).paging({
    ...useTransformQuery(formState, {}, 'search'),
    current,
    pageSize
  })
)

onRestFormState(setPage)
const { data: couponData, loading: couponLoading } = useApiRequest<CouponName.CouponType & { userCount: number }>(() => couponStatisticInfoApi(+id).get())
</script>

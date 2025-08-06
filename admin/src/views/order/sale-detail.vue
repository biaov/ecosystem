<template>
  <a-space direction="vertical" :size="20" class="w-full" v-if="!loading && data">
    <a-card title="订单信息" class="relative">
      <a-row wrap :gutter="[0, 24]">
        <a-col :span="8">订单编号：{{ data.order.sn }}</a-col>
        <a-col :span="8">服务编号：{{ data.sn }}</a-col>
        <a-col :span="8">申请时间：{{ data.createdAt }}</a-col>
        <a-col :span="8">申请用户：{{ data.user.nickname }}({{ data.user.mobile }})</a-col>
        <a-col :span="8">退款类型：{{ saleOrderTypeEnum.filter(data.type)?.label }}</a-col>
        <a-col :span="8">退款状态：{{ saleOrderStatusEnum.filter(data.status)?.label }}</a-col>
        <a-col :span="8">退款原因：{{ data.reason }}</a-col>
        <a-col :span="8">拒绝原因：{{ data.result ?? '-' }}</a-col>
      </a-row>
      <order-status-icon :status="data.status" />
    </a-card>
    <a-card title="商品信息">
      <a-table :data-source="data.order.items" row-key="id" :pagination="false">
        <a-table-column title="商品信息">
          <template #="{ record }">
            <a-space>
              <a-image :src="record.goodsPhoto" :width="40" :height="40" />
              <span>{{ record.goodsName }}</span>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="SKU" data-index="sku" />
        <a-table-column title="价格" :custom-render="$formatter.customRender('goodsPrice')" />
        <a-table-column title="数量" data-index="quantity" />
        <a-table-column title="小计" :custom-render="$formatter.customRender('goodsPrice', 'quantity', '*')" />
      </a-table>
      <a-row justify="end" class="pt-12">
        <a-space>
          <span>退款金额:</span>
          <span class="text-danger font-bold">¥{{ data.refundAmount.toFixed(2) }}</span>
        </a-space>
      </a-row>
    </a-card>
    <a-card :title="`物流信息 ${expressLabel} | ${data.trace.expressSn}`" v-if="data.trace">
      <a-steps direction="vertical" :current="data.trace.traces.length" :items="data.trace.traces.map(({ date, message }) => ({ title: date, description: message }))" progress-dot />
    </a-card>
  </a-space>
</template>
<script lang="ts" setup>
import { saleOrderApi } from '@/api/order'
import { expressSettingApi } from '@/api/setting'
import type { OrderName } from '@/api/types'
import OrderStatusIcon from './components/order-status-icon.vue'
import { saleOrderTypeEnum, saleOrderStatusEnum } from './enums'

const { id } = useRoute().params
const { data, loading } = useApiRequest<OrderName.SaleOrderDataType>(() => saleOrderApi.get(+id), true, null)

const { data: expressOptions } = useApiRequest<Option[]>(async () => {
  const res = await expressSettingApi.get()
  if (!res) return []
  return res.value
})
const expressLabel = computed(() => {
  const expressCode = data.value.trace?.expressCode
  return expressOptions.value.find(item => item.value === expressCode)?.label
})
</script>

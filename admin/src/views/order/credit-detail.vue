<template>
  <a-space direction="vertical" :size="20" class="w-full" v-if="!loading && data">
    <a-card title="基本信息">
      <a-row wrap :gutter="[0, 24]">
        <a-col :span="8">订单编号：{{ data.sn }}</a-col>
        <a-col :span="8">下单用户：{{ data.user.nickname }}({{ data.user.mobile }})</a-col>
        <a-col :span="8">下单时间：{{ data.createdAt }}</a-col>
        <a-col :span="8">订单来源：{{ sourceEnum.filter(data.source)?.label }}</a-col>
        <a-col :span="8">订单类型：{{ orderTypeEnum.filter(data.type)?.label }}</a-col>
        <a-col :span="8">订单状态：{{ orderStatusEnum.filter(data.status)?.label }}</a-col>
        <a-col :span="8">订单备注：{{ data.remark }}</a-col>
      </a-row>
    </a-card>
    <a-card title="商品信息">
      <a-table :data-source="data.items" row-key="id" :pagination="false">
        <a-table-column title="商品信息">
          <template #="{ record }">
            <a-space>
              <a-image :src="record.goodsPhoto" :width="40" :height="40" />
              <span>{{ record.goodsName }}</span>
            </a-space>
          </template>
        </a-table-column>
        <a-table-column title="SKU" data-index="sku" />
        <a-table-column title="价格" :custom-render="$formatter.customRender('goodsCredit')" />
        <a-table-column title="数量" data-index="quantity" />
        <a-table-column title="小计" :custom-render="$formatter.customRender('goodsCredit', 'quantity', '*')" />
      </a-table>
      <a-row justify="end" class="pt-12">
        <a-space>
          <span>兑换积分:</span>
          <span class="text-danger font-bold">¥{{ data.credit }}</span>
        </a-space>
      </a-row>
    </a-card>
    <a-card title="收货信息">
      <a-space direction="vertical" :size="20">
        <span>收货人：{{ data.name }}</span>
        <span>手机号：{{ data.mobile }}</span>
        <span>收货地址：{{ data.province }} {{ data.city }} {{ data.district }} {{ data.address }}</span>
      </a-space>
    </a-card>
    <a-card :title="`物流信息 ${expressLabel} | ${data.trace.expressSn}`" v-if="data.trace">
      <a-steps direction="vertical" :current="data.trace.traces.length" :items="data.trace.traces.map(({ date, message }) => ({ title: date, description: message }))" progress-dot />
    </a-card>
  </a-space>
</template>
<script lang="ts" setup>
import { orderApi } from '@/api/order'
import { expressSettingApi } from '@/api/setting'
import { sourceEnum } from '@/enums'
import type { OrderName } from '@/api/types'
import { orderTypeEnum, orderStatusEnum } from './enums'

const { id } = useRoute().params
const router = useRouter()
const { data, loading } = useApiRequest<OrderName.CreditOrderDataType>(() => orderApi.get(+id), true, null)

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

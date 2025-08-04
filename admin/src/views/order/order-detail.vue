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
    <a-card title="支付信息">
      <a-row wrap>
        <a-col :span="8">支付金额：{{ data.payAmount.toFixed(2) }}</a-col>
        <a-col :span="8">支付时间：{{ data.payTime ?? '-' }}</a-col>
        <a-col :span="8">支付方式：{{ payTypeEnum.filter(data.payType)?.label ?? '-' }}</a-col>
      </a-row>
    </a-card>
    <a-card title="发票信息" v-if="data.invoice">
      <a-row wrap :gutter="[0, 24]">
        <a-col :span="8">发票类型：{{ invoiceTypeEnum.filter(data.invoice.type)?.label }}</a-col>
        <a-col :span="8">发票抬头：{{ data.invoice.title }}</a-col>
        <a-col :span="8">纳税人识别号：{{ data.invoice.no }}</a-col>
        <a-col :span="8">开户行：{{ data.invoice.bank ?? '-' }}</a-col>
        <a-col :span="8">开户行账号：{{ data.invoice.bankAccount ?? '-' }}</a-col>
        <a-col :span="8">手机号：{{ data.invoice.mobile ?? '-' }}</a-col>
        <a-col :span="8">地址：{{ data.invoice.address ?? '-' }}</a-col>
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
        <a-table-column title="价格" :custom-render="$formatter.customRender('goodsPrice')" />
        <a-table-column title="数量" data-index="quantity" />
        <a-table-column title="小计" :custom-render="$formatter.customRender('goodsPrice', 'quantity', '*')" />
      </a-table>
      <a-row justify="end" class="pt-12">
        <a-space>
          <span>商品总金额:</span>
          <span class="text-danger font-bold">¥{{ (data.payAmount + data.discountAmount).toFixed(2) }}</span>
          <span>-</span>
          <span>优惠金额:</span>
          <span class="text-danger font-bold">¥{{ data.discountAmount.toFixed(2) }}</span>
          <span>=</span>
          <span>应付金额:</span>
          <span class="text-danger font-bold">¥{{ data.payAmount.toFixed(2) }}</span>
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
import { orderTypeEnum, orderStatusEnum, payTypeEnum, invoiceTypeEnum } from './enums'

const { id } = useRoute().params
const router = useRouter()
const { data, loading } = useApiRequest<OrderName.OrderDataType>(() => orderApi.get(+id), true, null)

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

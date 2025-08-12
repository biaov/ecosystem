<template>
  <!-- 优惠券规则 -->
  <a-space direction="vertical">
    <a-space v-for="(item, index) in listData" :key="index">
      <a-select v-model:value="item.couponId" :options="couponOptions" placeholder="请选择优惠券" :field-names="{ label: 'name', value: 'id' }" class="w-200!" :disabled="disabled" />
      <a-input-number v-model:value="item.quantity" :min="1" :max="9999" :precision="0" placeholder="每人发放数量" :disabled="disabled" />
      <a-button type="text" @click="onDelete(index)" :disabled="disabled || listData.length <= 1">
        <template #icon>
          <c-ant-icon name="CloseCircleFilled" :color="disabled || listData.length <= 1 ? 'rgba(0, 0, 0, 0.2)' : '#f56c6c'" />
        </template>
      </a-button>
    </a-space>
    <a-button type="link" class="p-0" :disabled="disabled" @click="onAddItem">添加发放层级</a-button>
  </a-space>
</template>

<script lang="ts" setup>
import { couponApi } from '@/api/coupon'

withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

interface ListItemType {
  couponId: string
  quantity: number
}

const listData = defineModel<Partial<ListItemType>[]>({ default: () => [] })
const { data: couponOptions } = useApiRequest(couponApi.all)

const initItem = () => {
  return {
    couponId: undefined,
    quantity: undefined
  } as Partial<ListItemType>
}

const onAddItem = () => {
  listData.value.push(initItem())
}
const onDelete = (index: number) => {
  listData.value = listData.value.filter((_, i) => i !== index)
}

watch(
  listData,
  value => {
    !(value && value.length) && (listData.value = [initItem()])
  },
  { immediate: true }
)
</script>

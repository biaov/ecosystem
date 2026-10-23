<template>
  <!-- 购物车 -->
  <div class="p-48">
    <h2 class="text-6xl font-bold text-center mb-48">购物车</h2>
    <div class="w-1200 mx-auto">
      <div class="p-48 bg-white min-h-[50vh] mb-24">
        <div v-if="isLogin">
          <div v-if="data.length">
            <div v-for="(item, index) in data" :key="item.id" class="flex items-center gap-24 mb-24 border-b-2 border-b-gray-100 pb-24">
              <me-checkbox :model-value="item.checked" class="cursor-pointer shrink-0" icon-size="24px" shape="square" @update:modelValue="onChangeSelect(index)" />
              <img :src="item.photo" :alt="`商品图${index + 1}`" class="w-120 h-120 object-cover shrink-0 bg-gray-100" />
              <div class="flex-1 flex flex-col gap-2 overflow-hidden">
                <h3 class="font-bold text-base truncate">{{ item.name }}</h3>
                <p class="text-sm text-info">
                  {{ item.attrs.reduce((prev, item, i) => `${prev}${i ? ' | ' : ''}${item.label} : ${item.value}`, '') }}
                </p>
                <p class="text-sm text-danger mb-12">¥ {{ item.price }}</p>
                <div class="flex items-center gap-12 text-sm">
                  <me-stepper :model-value="item.quantity" @update:modelValue="onChangeQuantity($event, index)" :max="item.stock || 1" class="select-none" border-radius="0" />
                  <span class="text-info" v-if="item.stock">有货(限购{{ item.stock }}件)</span>
                  <span class="text-info" v-else>库存不足</span>
                </div>
              </div>
              <c-ant-icon name="CloseOutlined" class="cursor-pointer hover:text-title transition shrink-0 block" @click="onDelete(index)" />
            </div>
          </div>
          <div v-else class="flex flex-col justify-center items-center pt-100">
            <me-empty text="暂无商品" />
            <NuxtLink to="/category">
              <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]!">去逛逛</me-button>
            </NuxtLink>
          </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center pt-100">
          <h2 class="text-xl mb-48 text-info">还未登录，无法查看购物车</h2>
          <me-button type="primary" class="cursor-pointer hover:bg-primary transition rounded-[0]!" @click="needLogin">去登录</me-button>
        </div>
      </div>
      <div class="p-48 bg-white flex justify-between text-base" v-if="isLogin && data.length">
        <div class="flex gap-24 items-center">
          <me-checkbox :model-value="allSelected" class="cursor-pointer text-info" icon-size="24px" shape="square" @update:modelValue="onClickAll">全选</me-checkbox>
          <span>
            共 {{ totalInfo.count }} 件商品，总计
            <span class="text-danger font-bold">¥ {{ totalInfo.price }}</span>
          </span>
        </div>
        <me-button type="danger" class="cursor-pointer hover:bg-danger transition rounded-[0]!" @click="handlePay">去结算</me-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { confirmOrderApi } from '@/api/order'
import { cartApi, cartSelectAllApi } from '@/api/goods'
import type { CartItemType, ConfirmOrderName } from '@/api/types'

const { isLogin, needLogin } = useStore()
const router = useRouter()

const data = ref<CartItemType[]>([])

const getData = async () => {
  if (!isLogin.value) return
  data.value = await cartApi.all<CartItemType>()
}

onMounted(getData)
watch(isLogin, v => v && getData())

const allSelected = computed(() => !!data.value.length && data.value.every(item => item.checked))

const totalInfo = computed(() => {
  let count = 0
  const price = data.value
    .reduce((prev, item) => {
      let cur = 0
      if (item.checked) {
        count += item.quantity
        cur = +(item.price * item.quantity).toFixed(2)
      }
      return +(prev + cur).toFixed(2)
    }, 0)
    .toFixed(2)
  return { price, count }
})

const onChangeSelect = (index: number) => {
  const item = data.value[index]!
  useToastRequest(() => cartApi.update(item.id, { checked: !item.checked }), getData, false)
}
const onChangeQuantity = (value: number, index: number) => {
  const item = data.value[index]!
  useToastRequest(() => cartApi.update(item.id, { quantity: value }), getData, false)
}
const onClickAll = () => {
  useToastRequest(() => cartSelectAllApi.post({ checked: !allSelected.value }), getData, false)
}
const onDelete = (index: number) => {
  const item = data.value[index]!
  useToastRequest(() => cartApi.delete(item.id), getData)
}
const handlePay = () => {
  const groups = data.value.reduce((prev, item) => prev.concat(item.checked ? [{ id: item.goodsId, sku: item.sku, quantity: item.quantity }] : []), [] as ConfirmOrderName.ConfirmOrderParam[])
  if (!groups.length) {
    MeToast('请选择商品')
    return
  }
  useToastRequest(
    () => confirmOrderApi.create<IdDataType>({ items: groups }),
    res => {
      router.push(`/confirm-order/${res.id}`)
    }
  )
}
</script>

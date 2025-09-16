<template>
  <!-- 购物车 -->
  <div class="p-48">
    <h2 class="text-6xl font-bold text-center mb-48">购物车</h2>
    <div class="w-1200 mx-auto">
      <div class="p-48 bg-white min-h-[50vh] mb-24">
        <div v-if="isLogin">
          <div v-if="data">
            <div v-for="(item, index) in data.items" :key="index" class="flex items-center gap-24 mb-24 border-b-2 border-b-gray-100 pb-24">
              <me-checkbox :model-value="item.checked" class="cursor-pointer shrink-0" icon-size="24px" shape="square" @update:modelValue="onChangeSelect(index)" />
              <img :src="item.photo" :alt="`商品图${index + 1}`" class="w-120 h-120 object-cover shrink-0 bg-gray-100" />
              <div class="flex-1 flex flex-col gap-2 overflow-hidden">
                <h3 class="font-bold text-base truncate">{{ item.name }}</h3>
                <p class="text-sm text-gray-400">
                  {{ item.attrs.reduce((prev, item, i) => `${prev}${i ? ' | ' : ''}${item.label} : ${item.value}`, '') }}
                </p>
                <p class="text-sm text-danger mb-12">¥ {{ item.price }}</p>
                <div class="flex items-center gap-12 text-sm">
                  <me-stepper :model-value="item.quantity" @update:modelValue="onChangeQuantity($event, index)" :max="item.stock || 1" class="select-none" border-radius="0" />
                  <span class="text-info" v-if="item.stock">有货(限购{{ item.stock }}件)</span>
                  <span class="text-info" v-else>库存不足</span>
                </div>
              </div>
              <c-ant-icon name="CloseOutlined" class="cursor-pointer hover:text-gray-800 transition shrink-0 block" />
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
      <div class="p-48 bg-white flex justify-between text-base" v-if="isLogin && data">
        <div class="flex gap-24 items-center">
          <me-checkbox v-model="allSelected" class="cursor-pointer text-info" icon-size="24px" shape="square" @update:modelValue="onClickAll">全选</me-checkbox>
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
import type { ConfirmOrderName } from '@/api/types'

const { isLogin, needLogin } = useStore()
const router = useRouter()
const { data } = useAsyncData('cart', async () => {
  return {
    items: Array.from({ length: 2 }, (_, i) => ({
      id: i + 1,
      name: `商品${i + 1}`,
      photo: `https://dummyimage.com/200x120/f60&text=商品${i}`,
      price: 120.58,
      checked: false,
      quantity: 1,
      stock: 10,
      attrs: [
        { label: '颜色', value: '红色' },
        { label: '尺寸', value: 'M' }
      ],
      sku: `12313132${i}`
    }))
  }
})
const allSelected = ref(false)
const totalInfo = ref({ price: '0.00', count: 0 })
const calcTotalInfo = () => {
  const { items } = data.value!
  let count = 0
  const price = items
    .reduce((prev, item) => {
      let cur = 0
      if (item.checked) {
        count += item.quantity
        cur = +(item.price * item.quantity).toFixed(2)
      }
      return +(prev + cur).toFixed(2)
    }, 0)
    .toFixed(2)
  totalInfo.value = { price, count }
}
const onChangeSelect = (index: number) => {
  const { items } = data.value!
  items[index]!.checked = !items[index]!.checked
  allSelected.value = !items.some(item => !item.checked)
  calcTotalInfo()
}
const onChangeQuantity = (value: number, index: number) => {
  const { items } = data.value!
  items[index]!.quantity = value
  calcTotalInfo()
}
const onClickAll = () => {
  data.value!.items.forEach(item => {
    item.checked = allSelected.value
  })
  calcTotalInfo()
}
const handlePay = () => {
  const { items } = data.value!
  const groups = items.reduce((prev, item) => prev.concat(item.checked ? [{ id: item.id, sku: item.sku, quantity: item.quantity }] : []), [] as ConfirmOrderName.ConfirmOrderParam[])
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

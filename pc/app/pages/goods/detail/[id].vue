<template>
  <!-- 商品详情 -->
  <div class="p-24">
    <div class="w-[80%] mx-auto" v-if="data">
      <div class="p-48 bg-white flex gap-60 mb-24">
        <div class="flex-grow w-0 flex gap-48">
          <div class="h-570 overflow-auto shrink-0">
            <div
              v-for="(item, index) in data.photos"
              :key="index"
              class="border-2 border-transparent hover:border-red-400 w-80 aspect-square cursor-pointer duration-300 overflow-hidden mb-12"
              @mouseenter="onMouseenter(item)"
            >
              <span v-if="item === 'video'" class="text-base w-full h-full flex items-center justify-center bg-gray-100">视频</span>
              <img :src="item" :alt="`产品图${index}`" class="w-full h-full object-cover" v-else />
            </div>
          </div>
          <div class="flex-1 relative group cursor-move" ref="rectNode" @mousemove="setMove">
            <video :src="data.video" class="w-full h-full object-cover relative z-10" controls v-show="isVideo"></video>
            <img :src="currentImg || data.currentImg" alt="当前图" class="w-full h-full object-cover" v-show="!isVideo" />
            <div class="absolute group-hover:opacity-[1] opacity-[0] max-w-500 w-[80%] aspect-square bg-[url('@/assets/grid.png')]" :style="`top:${move.y}px;left:${move.x}px;`" ref="moveNode"></div>
            <div
              class="absolute top-0 -right-524 bg-no-repeat scale-[1.5] origin-top-left group-hover:block hidden shadow-md"
              :style="`width:${movesize?.width}px;height:${movesize?.height}px;background-image:url(${currentImg || data.currentImg});background-size:${rectsize?.width}px ${
                rectsize?.height
              }px;background-position:-${move.x}px -${move.y}px;`"
            ></div>
          </div>
        </div>
        <div class="flex-grow w-0">
          <div class="w-full">
            <h1 class="font-bold text-2xl mb-12">{{ data.name }}</h1>
            <div class="flex items-end gap-48 text-sm">
              <span class="text-info">价格</span>
              <div class="text-danger font-bold">
                ¥
                <span class="text-2xl">{{ curPrice }}</span>
              </div>
            </div>
            <me-divider class="mt-24" />
            <goods-attr :list="data.attrGroups" :origin-data="data" v-model="selectAttr" />
            <div class="flex items-center gap-48 text-sm mt-48">
              <span class="text-info">数量</span>
              <div class="flex items-center gap-12">
                <me-stepper v-model="formState.quantity" :disabled="!stock" :max="stock || 1" class="select-none" border-radius="0" />
                <span class="text-info" v-if="stock">有货(限购{{ stock }}件)</span>
                <span class="text-info" v-else>库存不足</span>
              </div>
            </div>
            <div class="flex w-240 h-50 text-sm cursor-pointer text-white mt-60">
              <div class="flex-1 flex items-center justify-center bg-danger hover:bg-danger transition" @click="onAddCart">加入购物车</div>
              <div class="flex-1 flex items-center justify-center bg-primary hover:bg-primary transition" @click="onBuy">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-48 bg-white">
        <h2 class="text-2xl font-bold mb-12">商品详情</h2>
        <div v-html="data.desc" class="text-sm"></div>
      </div>
      <c-goods-list class="w-full" />
    </div>
    <div class="text-2xl text-center pt-200" v-else>此商品不存在</div>
  </div>
</template>
<script lang="ts" setup>
import { goodsApi, cartApi } from '@/api/goods'
import { confirmOrderApi } from '@/api/order'
import type { GoodsItemType, TransformGoodsDataType } from '@/api/types'
import GoodsAttr from '@/biz-components/goods-attr.vue'
import { useDetailMove, useDetailInfo } from './hook'

const { needLogin } = useStore()
const { id } = useRoute().params
const router = useRouter()
const { data } = useAsyncData<TransformGoodsDataType>('goods-detail', async () => {
  const res = await goodsApi.get<GoodsItemType>(+id!)
  res.video && res.photos.unshift('video')
  const attrGroup: Record<string, string[]> = {}
  res.specs.forEach(item => {
    item.attrs.forEach(attr => {
      !attrGroup[attr.label] && (attrGroup[attr.label] = [])
      attrGroup[attr.label]!.push(attr.value)
    })
  })

  return { ...res, currentImg: res.photos[0]!, attrGroups: Object.entries(attrGroup) }
})
const { isVideo, currentImg, onMouseenter, move, moveNode, movesize, rectsize, setMove } = useDetailMove(data)
const { selectSku, selectAttr, curPrice, stock } = useDetailInfo(data)
const { formState, setFormRules, validFormState } = useFormState({
  quantity: 1
})
setFormRules({
  quantity: {
    validator(value: number) {
      if (!selectSku.value) return Promise.reject('请选择规格')
      if (value > stock.value) return Promise.reject('库存不足')
      return Promise.resolve()
    }
  }
})

const onAddCart = async () => {
  if (!(await validFormState())) return
  if (!needLogin()) return
  useToastRequest(() =>
    cartApi.create({
      quantity: formState.value.quantity,
      sku: selectSku.value
    })
  )
}
const onBuy = async () => {
  if (!(await validFormState())) return
  if (!needLogin()) return
  useToastRequest(
    () =>
      confirmOrderApi.create<IdDataType>({
        quantity: formState.value.quantity,
        sku: selectSku.value
      }),
    res => {
      router.push(`/confirm-order/${res.id}`)
    },
    false
  )
}
</script>

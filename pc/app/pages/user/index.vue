<template>
  <!-- 用户信息  -->
  <div class="flex gap-24 flex-wrap row-wrap mb-24">
    <div class="bg-blue-50 p-24 flex gap-24 flex-1 max-[1920px]:basis-full">
      <NuxtLink to="/user/edit-info" class="w-120 h-120 rounded-full bg-gray-100 relative overflow-hidden cursor-pointer group">
        <img :src="state.userInfo?.avatar" alt="头像" class="w-full h-full object-cover" />
        <div class="absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] text-white text-sm w-full h-full flex items-center justify-center transition opacity-0 group-hover:opacity-100">编辑资料</div>
      </NuxtLink>
      <div class="flex flex-col justify-center">
        <NuxtLink to="/user/edit-info" class="text-2xl font-bold hover:text-primary mb-8">{{ state.userInfo?.nickname }}</NuxtLink>
        <div class="text-info">{{ state.userInfo?.email ?? '' }}</div>
      </div>
    </div>
    <div class="p-24 bg-gray-50 flex-1 max-[1920px]:basis-full">
      <NuxtLink to="/user/order" class="flex! items-center justify-between group">
        <span class="text-xl font-bold">全部订单</span>
        <c-ant-icon name="RightOutlined" class="text-info group-hover:text-blue-400" />
      </NuxtLink>
      <div class="flex pt-24">
        <NuxtLink class="flex-1 flex! flex-col justify-center items-center gap-8 hover:text-blue-400" v-for="(item, index) in data" :key="index" :to="item.path">
          <div>{{ item.label }}</div>
          <div class="text-2xl font-bold">{{ item.count }}</div>
        </NuxtLink>
      </div>
    </div>
  </div>
  <NuxtLink :to="item.path" class="flex! items-center justify-between group p-24 bg-gray-50 mb-24 hover:bg-blue-50 hover:text-blue-400 transition" v-for="(item, index) in moreList" :key="index">
    <div class="flex items-center gap-12">
      <c-ant-icon :name="item.anIcon" class="text-info group-hover:text-blue-400" />
      <span class="text-xl">{{ item.label }}</span>
    </div>
    <c-ant-icon name="RightOutlined" class="text-info group-hover:text-blue-400" />
  </NuxtLink>
</template>

<script lang="ts" setup>
const { state } = useStore()
const { data } = useAsyncData('user-order-label', async () => {
  return [
    {
      path: '/user/order?status=1',
      label: '待支付'
    },
    {
      path: '/user/order?status=2',
      label: '待发货'
    },
    {
      path: '/user/order?status=3',
      label: '待收货'
    },
    {
      path: '/user/after-sale',
      label: '售后'
    }
  ].map(item => ({ ...item, count: ~~(Math.random() * 10) }))
})

const moreList = [
  {
    anIcon: 'EditOutlined',
    path: '/user/edit-password',
    label: '修改密码'
  },
  {
    anIcon: 'AlignCenterOutlined',
    path: '/user/address',
    label: '收货地址'
  }
]
</script>

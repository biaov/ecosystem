<template>
  <!-- 用户信息  -->
  <div class="flex gap-48">
    <div class="flex-1">
      <div class="mb-12">昵称</div>
      <me-input v-model="formState.nickname" placeholder="请输入您的昵称" maxlength="12" />
    </div>
    <div class="w-[40%] flex flex-col gap-48 text-2xl font-bold text-white">
      <NuxtLink :to="item.path" v-for="(item, index) in blocks" :key="index" class="h-200 flex! justify-center items-center bg-blue-950 hover:bg-blue-900 transition" :style="item.style">{{ item.label }}</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { state } = useStore()
const { formState } = useFormState({
  nickname: ''
})

const blocks = [
  {
    label: '修改密码',
    path: '/user/edit-password',
    style: {
      // background: 'linear-gradient(-45deg, #cd408f 0%, #094fc3 100%)'
    }
  },
  {
    label: '收货地址',
    path: '/user/address',
    style: {
      // background: 'linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%)'
    }
  }
]
</script>

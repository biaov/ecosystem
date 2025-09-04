<template>
  <!-- 首页 -->
  <c-swiper :list="bannerList" />
  <c-recommend-goods />
</template>
<script lang="ts" setup>
import { homeApi } from '@/api/decorator'

const { data: bannerList } = useAsyncData<{ link: string; photo: string }[]>('home', () => homeApi.get(), { default: () => [] })

useHead({
  title: '商城官网 - 购物方便快捷，安全可靠',
  meta: [
    { name: 'keywords', content: '商城官网，演示网站，在线商城，购物方便快捷，安全可靠' },
    { name: 'description', content: '商城官网，提供在线购物服务，购物方便快捷，安全可靠' }
  ]
})
</script>

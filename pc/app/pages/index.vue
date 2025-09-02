<template>
  <!--  -->
  <div class="home">
    <c-swiper :list="bannerList" />
  </div>
</template>
<script lang="ts" setup>
const bannerList = Array.from({ length: 5 }, (_, i) => ({
  url: `https://dummyimage.com/600x400/f60/fff&text=s${i}`,
  title: 'banner' + i,
  link: 'https://baidu.com'
}))

useHead({
  title: '商城官网 - 购物方便快捷，安全可靠',
  meta: [
    { name: 'keywords', content: '商城官网，演示网站，在线商城，购物方便快捷，安全可靠' },
    { name: 'description', content: '商城官网，提供在线购物服务，购物方便快捷，安全可靠' }
  ]
})
</script>

<template>
  <div class="w-screen h-screen bg-[radial-gradient(#48c6ef, #6f86d6)]">
    <!-- <div class="position top-50 left-50 text-white text-34 font-bold"></div> -->
    <a-image src="/logo.svg" :width="60" class="position top-50 left-50" />
    <a-card title="登录" class="w-500">
      <a-space direction="vertical">
        <img src="@/assets/template.svg" alt="" />
        <a-button type="primary" @click="onSubmit">提交</a-button>
      </a-space>
    </a-card>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
const store = useStore()

/**
 * 提交
 */
const onSubmit = () => {
  // store.login({ token: 'token' })
  // router.push({ name: 'dashboard' })
}

</script>

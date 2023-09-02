<template>
  <view class="p-tb-30">
    <view-cell>
      <template #left>头像</template>
      <template #right>
        <view class="w-100 h-100 br-half" @click="onChooseImg">
          <image :src="userInfo.avatar || defaultAvatar" mode="widthFix" class="w-fill h-fill br-half"></image>
        </view>
      </template>
    </view-cell>
  </view>
</template>

<script setup lang="ts">
import { defaultAvatar } from '@/config'
import { uploadImg, cloneDeep, toast } from '@/utils/function'
import { userApi } from '@/api/user'
import { useStore } from '@/stores'
import type { UserInfo } from '@/stores/types'

const state = useStore()

const userInfo = ref(cloneDeep(state.userInfo))

const onChooseImg = async () => {
  const { url } = await uploadImg()
  const res = await userApi.update<UserInfo>(state.userInfo.id as number, { avatar: url })
  state.setUserInfo(res)
  toast('修改成功')
}
</script>

<style scoped lang="less"></style>

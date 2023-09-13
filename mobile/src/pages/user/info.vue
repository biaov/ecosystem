<template>
  <view class="p-tb-30">
    <block v-if="state.isLogin">
      <view-cell border>
        <template #left>头像</template>
        <template #right>
          <view class="w-100 h-100 br-half" @click="onChooseImg">
            <image :src="state.userInfo.avatar || defaultAvatar" mode="widthFix" class="w-fill h-fill br-half"></image>
          </view>
        </template>
      </view-cell>
      <view-cell :arrow="false" border>
        <template #left>手机号码</template>
        <template #right>
          <view class="color-45">{{ state.userInfo.phoneNumber }}</view>
        </template>
      </view-cell>
      <view-cell :arrow="false" border>
        <template #left>昵称</template>
        <template #right>
          <input :value="state.userInfo.nickname" type="text" placeholder="请输入昵称" class="color-85 fs-24 align-right" placeholder-class="color-45" @confirm="onUpdateNickname" />
        </template>
      </view-cell>
      <picker :range="genderList.options()" range-key="label" @change="onUpdateGender">
        <view-cell border>
          <template #left>性别</template>
          <template #right>
            {{ genderList.filter(state.userInfo.gender)?.label }}
          </template>
        </view-cell>
      </picker>
      <view-cell :arrow="false" border>
        <template #left>邮箱</template>
        <template #right>
          <input :value="state.userInfo.email" type="text" placeholder="请输入邮箱" class="color-85 fs-24 align-right" placeholder-class="color-45" @confirm="onUpdateEmail" />
        </template>
      </view-cell>
      <view-cell :arrow="false" border flex="flex-start">
        <template #left>个性签名</template>
        <template #right>
          <textarea
            :value="state.userInfo.signature"
            type="text"
            :maxlength="100"
            auto-height
            placeholder="请输入个性签名"
            class="color-85 fs-24 align-right textarea"
            placeholder-class="color-45"
            @confirm="onUpdateSignature"
          ></textarea>
        </template>
      </view-cell>
      <view class="m-t-40 p-30">
        <view class="btn btn-danger" @click="onExit">退出登录</view>
      </view>
    </block>
    <view v-else class="flex flex-cc p-t-30 fs-30 color-45">请登录</view>
  </view>
</template>

<script setup lang="ts">
import { defaultAvatar } from '@/config'
import { uploadImg } from '@/utils/file'
import { toast } from '@/utils/function'
import { userApi } from '@/api/user'
import { useStore } from '@/stores'
import { genderList } from '@/enums'
import type { UserInfo } from '@/stores/types'
import type { FormEvent } from '@/types'

const state = useStore()

/**
 * 更改用户信息
 */
const handleUpdateUserInfo = async (option: Partial<UserInfo>) => {
  const res = await userApi.update<UserInfo>(state.userInfo.id as number, option)
  state.setUserInfo(res)
  toast('修改成功')
}

/**
 * 更改用户头像
 */
const onChooseImg = async () => {
  const { url } = await uploadImg()
  handleUpdateUserInfo({ avatar: url })
}

/**
 * 更改用户昵称
 */
const onUpdateNickname = (e: FormEvent.InputEvent) => {
  const { value } = e.detail
  if (!value) return toast('昵称不能为空')
  handleUpdateUserInfo({ nickname: value })
}

/**
 * 更改用户性别
 */
const onUpdateGender = (e: FormEvent.PickerEvent<number>) => {
  const { value } = e.detail
  handleUpdateUserInfo({ gender: value })
}

/**
 * 更改用户邮箱
 */
const onUpdateEmail = (e: FormEvent.InputEvent) => {
  const { value } = e.detail
  if (!value) return toast('邮箱不能为空')
  handleUpdateUserInfo({ email: value })
}

/**
 * 更改个性签名
 */
const onUpdateSignature = (e: FormEvent.InputEvent) => {
  const { value } = e.detail
  if (!value) return toast('签名不能为空')
  handleUpdateUserInfo({ signature: value })
}

/**
 * 退出登录
 */
const onExit = () => {
  state.logout()
  uni.navigateBack()
}
</script>
<style scoped lang="less">
.textarea {
  width: 100%;
  min-height: 100rpx;
}
</style>

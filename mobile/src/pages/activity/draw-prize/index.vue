<script lang="ts" setup>
import { toast } from '@/utils/function'
import { useRecordData, useDrawPrize } from './hooks'

const { deviceId } = uni.getSystemInfoSync()
const activityId = ref(0)
const [loading, setLoading] = useVisible(true)

const { isDrawn, prizeList, translateAnimation, itemHeight, modalVisible, setModalVisible, drawRestful, handleDraw, loadPrizeData } = useDrawPrize({ activityId, deviceId })

const { beforeValidtor, formState, loadRecordData, handleSubmit } = useRecordData({ deviceId, activityId, isDrawn, drawRestful })

onLoad(op => {
  if (!(op && op.id)) {
    toast('参数错误')
    return
  }
  activityId.value = op.id

  useSilentAuth(async () => {
    await Promise.all([loadRecordData(), loadPrizeData()])
    setLoading(false)
  })
})
</script>

<template>
  <view class="p-30 draw-prize w-100vw h-100vh flex flex-column flex-dc bg-white p-t-100" v-if="!loading">
    <block v-if="beforeValidtor">
      <view class="fs-30 m-b-100 bold">验证信息</view>
      <input type="text" placeholder="请输入你的姓名" class="input bg-white m-b-40" v-model="formState.username" />
      <input type="text" placeholder="请输入你的手机号" class="input bg-white m-b-300" v-model="formState.phoneNumber" />
      <view class="btn btn-primary" @click="handleSubmit">确定</view>
    </block>
    <block v-else-if="!isDrawn">
      <view class="fs-30 m-b-100 bold">抽奖</view>
      <view class="panel-draw w-fill m-b-200 bg-color-f5 hidden br-20" :style="`height:${itemHeight}px;`">
        <view class="w-fill" :animation="translateAnimation">
          <view v-for="(item, index) in prizeList" :key="index" class="flex flex-cc color-primary fs-60 w-fill" :style="`height:${itemHeight}px;`">{{ item.label }}</view>
        </view>
      </view>
      <view class="btn btn-primary" @click="handleDraw">点击抽奖</view>
    </block>
    <block v-else>
      <view class="fs-30 m-b-100 bold">中奖结果</view>
      <view class="color-primary flex flex-ac fs-60">{{ drawRestful }}</view>
    </block>
  </view>
  <loading-page :loading="loading" />
  <view-mask v-model:visible="modalVisible">
    <view-modal @cancel="setModalVisible(false)" @ok="setModalVisible(false)">
      <view class="p-tb-60 color-primary fs-30">{{ drawRestful }}</view>
    </view-modal>
  </view-mask>
</template>

<style lang="less" scoped>
@import './index.less';
</style>

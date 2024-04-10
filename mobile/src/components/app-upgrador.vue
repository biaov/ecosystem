<template>
  <view-mask v-model:visible="modalVisible">
    <view-modal title="更新提示" v-bind="modalPreset[modalTips.type]" @cancel="setModalVisible(false)" @ok="handleSubmit">
      <view class="p-tb-60">
        <progress-bar :progress="modalTips.progress" class="m-b-20" v-if="modalTips.type === 'progress'" />
        <view class="color-primary fs-30">{{ modalTips.message }}</view>
      </view>
    </view-modal>
  </view-mask>
</template>
<script lang="ts" setup>
import { useVisible } from '@/composables/useVisible'
import { toast } from '@/utils/function'
import { latestVersionApi } from '@/api/common'
import type { AppUpgrador } from './types'

const props = withDefaults(
  defineProps<{
    /**
     * 显示状态
     */
    visible?: boolean

    /**
     * 自动检查更新
     */
    autoUpdate?: boolean
  }>(),
  {
    visible: false,
    autoUpdate: false
  }
)

const [modalVisible, setModalVisible] = useVisible()
const modalTips = ref<{
  message: string
  type: string
  progress?: number
}>({ message: '', type: '', progress: 0 })

const defaultPreset = { cancelText: '', okText: '知道了' }
const noFooterPreset = { cancelText: '', okText: '' }
const modalPreset: Readonly<AppUpgrador.ModalPreset> = Object.freeze({
  upgrade: { cancelText: '不更新', okText: '更新' },
  noUpgrade: defaultPreset,
  installFail: defaultPreset,
  installing: noFooterPreset,
  progress: noFooterPreset,
  success: defaultPreset,
  downloadFail: defaultPreset
})

/**
 * 检测升级器
 */
const checkUpdator = async () => {
  const { name } = await latestVersionApi.get<{ name: string }>()
  const latestVersion = name.slice(1)
  const { appVersion } = uni.getSystemInfoSync()
  const version = appVersion.split('.')
  const latest = latestVersion.split('.')
  if (latest.some((value, i) => value > version[i])) {
    modalTips.value = {
      message: `发现最新版本 ${name}，是否更新？体验更多功能`,
      type: 'upgrade'
    }
    setModalVisible(true)
  } else if (!props.autoUpdate) {
    modalTips.value = {
      message: `当前版本 v${appVersion} 已是最新版本`,
      type: 'noUpgrade'
    }
    setModalVisible(true)
  }
}

watch(
  () => props.visible,
  value => {
    if (!value) return
    // #ifdef APP-PLUS
    checkUpdator()
    // #endif
    // #ifndef APP-PLUS
    toast('只支持 APP 端')
    // #endif
  },
  { immediate: true }
)

/**
 * 格式化文件大小，Bytes -> M
 */
const formatterSize = (value: number) => +(value / 1024 / 1024).toFixed(2)

/**
 * 确定
 */
const handleSubmit = () => {
  switch (modalTips.value.type) {
    case 'upgrade':
      uni
        .downloadFile({
          url: import.meta.env.VITE_WGT_URL,
          success: res => {
            if (res.statusCode === 200) {
              modalTips.value = { message: '下载完成，安装中...', type: 'installing' }
              plus.runtime.install(
                res.tempFilePath,
                { force: false },
                () => {
                  modalTips.value = { message: '更新完成，须重启应用！', type: 'success' }
                },
                () => {
                  modalTips.value = { message: '安装失败', type: 'installFail' }
                }
              )
            } else {
              modalTips.value = { message: '下载失败', type: 'downloadFail' }
            }
          }
        })
        .onProgressUpdate(res => {
          modalTips.value = {
            message: `安装包下载中，请稍后 (${formatterSize(res.totalBytesWritten)} / ${formatterSize(res.totalBytesExpectedToWrite)}M)`,
            progress: res.progress,
            type: 'progress'
          }
        })
      break
    case 'success':
      plus.runtime.restart()
      break
    default:
      setModalVisible(false)
      break
  }
}
</script>

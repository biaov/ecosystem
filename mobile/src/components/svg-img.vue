<template>
  <image :src="imageValue" :mode="mode" :style="{ width, height }"></image>
</template>
<script lang="ts" setup>
const emit = defineEmits(['load'])
const props = withDefaults(
  defineProps<{
    /**
     * 图片地址
     */
    src: string
    /**
     * 需要替换的颜色
     */
    colors?: string[]
    /**
     * 图片模式
     */
    mode?: string
    /**
     * 图片宽度
     */
    width?: string
    /**
     * 图片高度
     */
    height?: string
  }>(),
  {
    colors: () => [],
    mode: 'widthFix',
    width: '100%',
    height: '100%'
  }
)

const imageValue = ref('')

/**
 * 读取文件
 */
const onReadFile = () => {
  if (!props.src) return
  if (props.colors.length) {
    uni.getFileSystemManager().readFile({
      filePath: props.src,
      encoding: 'utf8',
      success: ({ data }) => {
        data = String(data)
        let index = 0
        data = data.replace(/#[a-z0-9]{3,6}/gi, (word: string) => {
          const newColor = props.colors[index]
          index++
          return newColor || word
        })
        imageValue.value = `data:image/svg+xml,${encodeURIComponent(data)}`
        emit('load', imageValue.value)
      }
    })
  } else {
    imageValue.value = props.src
  }
}

watch(() => [props.src, props.colors], onReadFile, { deep: true, immediate: true })
</script>

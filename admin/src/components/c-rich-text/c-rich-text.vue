<template>
  <!-- 富文本编辑器 -->
  <div id="toolbar">
    <template v-for="(item, index) in toolbar" :key="index">
      <template v-if="Array.isArray(item)">
        <button :class="`ql-${subItem.class}`" :value="subItem.value" :title="subItem.title" v-for="(subItem, subIndex) in item" :key="subIndex"></button>
      </template>
      <select :class="`ql-${item.class}`" :title="item.title" v-else-if="Array.isArray(item.value)">
        <option v-for="(subItem, subIndex) in item.value" :value="subItem" :key="subIndex" :selected="item.selected === subItem"></option>
      </select>
      <button :class="`ql-${item.class}`" :title="item.title" v-else></button>
    </template>
    <emoji :quill="onGetQuill" />
  </div>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { uploadImageApi } from '@/api/common'
import './image-uploader'
import emoji from './emoji.vue'
import { toolbar } from './config'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    height?: string
  }>(),
  {
    height: '60vh',
    placeholder: '请输入...'
  }
)

const modelValue = defineModel<string>()

const onBlur = () => {
  modelValue.value = editor.getText().length <= 1 ? '' : editor.root.innerHTML
}

let editor: Quill
let qlEditor: HTMLDivElement | null
const onGetQuill = () => editor
onMounted(() => {
  editor = new Quill('#editor', {
    modules: {
      toolbar: '#toolbar',
      imageUploader: {
        upload: async (file: File) => {
          const { url } = await uploadImageApi.post<{ url: string }>({ file }, { headers: { 'Content-Type': 'multipart/form-data' } })
          return url
        }
      }
    },
    theme: 'snow',
    placeholder: props.placeholder
  })

  qlEditor = editor.container.querySelector('.ql-editor')
  qlEditor?.addEventListener('blur', onBlur)
})
onBeforeUnmount(() => {
  qlEditor?.removeEventListener('blur', onBlur)
})

watch(
  modelValue,
  async val => {
    await nextTick()
    editor.root.innerHTML = val || ''
  },
  { immediate: true }
)
</script>

<style lang="less">
#editor {
  height: v-bind(height);
}
</style>

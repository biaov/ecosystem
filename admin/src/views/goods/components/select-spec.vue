<template>
  <!-- 商品规格 -->
  <a-space direction="vertical" :size="20">
    <a-space wrap v-for="(item, index) in specsModel" :key="index" class="w-full">
      <a-input v-model:value="item.sku" placeholder="SKU" :disabled="disabled" />
      <a-input-number v-model:value="item.price" :min="0" :max="999999" :precision="2" placeholder="价格" class="w-100!" :disabled="disabled" />
      <a-input v-for="(attr, i) in item.attrs" :key="i" v-model:value="attr.value" :placeholder="attr.label" class="w-100" :disabled="disabled" />
      <c-upload v-model="item.photo" :size="32" title="商品图片" :disabled="disabled" />
      <a-button type="text" @click="onDelete(index)" :disabled="disabled || specsModel.length <= 1">
        <template #icon>
          <c-ant-icon name="CloseCircleFilled" :color="specsModel.length > 1 ? '#f56c6c' : 'rgba(0, 0, 0, 0.2)'" />
        </template>
      </a-button>
    </a-space>
    <a-button type="link" class="p-0" :disabled="disabled" @click="onAddSpec">添加规格</a-button>
  </a-space>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    specs?: string[]
    disabled?: boolean
  }>(),
  {
    specs: () => [],
    disabled: false
  }
)
export interface SpecType extends Record<string, any> {
  attrs: { label: string; value: string }[]
  photo?: string
  sku?: string
  price?: number
}
const specsModel = defineModel<SpecType[]>({ default: () => [] })

const initSpec = () => {
  const attrs = props.specs.map(label => ({ label, value: '' }))
  return {
    attrs,
    photo: undefined,
    sku: undefined,
    price: undefined
  }
}

watch(
  () => props.specs,
  value => {
    if (specsModel.value.length) {
      specsModel.value.forEach(spec => {
        spec.attrs = value.map(label => {
          const value = spec.attrs.find(item => item.label === label)?.value ?? ''
          return { label, value }
        })
      })
    } else {
      specsModel.value = [initSpec()]
    }
  },
  { immediate: true, deep: true }
)

const onAddSpec = () => {
  specsModel.value.push(initSpec())
}
const onDelete = (index: number) => {
  specsModel.value = specsModel.value.filter((_, i) => i !== index)
}
</script>

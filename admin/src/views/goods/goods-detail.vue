<template>
  <c-layout-form @ok="handleSubmit" v-if="!loading">
    <a-card title="基本信息">
      <a-form-item label="商品分类" required>
        <select-category v-model="formState.categoryId" placeholder="请选择商品分类" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="商品名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入商品名称" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="商品相册" required>
        <c-upload v-model:list="formState.photos" multiple :disabled="disabled" />
      </a-form-item>
      <a-form-item label="商品视频">
        <a-input v-model:value="formState.video" placeholder="请输入商品视频链接" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="是否上架" required>
        <a-switch v-model:checked="formState.onsale" :disabled="disabled" />
      </a-form-item>
    </a-card>
    <a-card title="商品规格">
      <a-form-item label="默认规格" required>
        <a-input v-model:value="formState.defaultSku" placeholder="请输入默认商品SKU" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="选择规格" required>
        <a-checkbox-group :value="specs" :options="specEnum.options()" :disabled="disabled" @change="onSpecChange" />
      </a-form-item>
      <a-form-item label="商品规格" required>
        <select-spec v-model="formState.specs" :specs="specs" :disabled="disabled" />
      </a-form-item>
    </a-card>
    <a-card>
      <c-rich-text v-model="formState.desc" placeholder="请输入商品详情..." :disabled="disabled" />
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { goodsApi } from '@/api/goods'
import SelectCategory from './components/select-category.vue'
import SelectSpec, { SpecType } from './components/select-spec.vue'
import { specEnum } from './enums'

const {
  params: { id },
  path
} = useRoute()

const disabled = ref(path.includes('/detail/'))
const router = useRouter()
const { formState, setFormRules, setFormState, validFormState } = useFormState({
  categoryId: undefined,
  name: undefined,
  onsale: false,
  photos: [] as string[],
  video: undefined,
  defaultSku: undefined,
  specs: [] as SpecType[],
  desc: undefined
})

setFormRules({
  categoryId: { required: true, message: '请选择商品分类' },
  name: { required: true, message: '请输入商品名称' },
  photos: { required: true, message: '请上传商品相册' },
  defaultSku: { required: true, message: '请输入默认商品SKU' },
  specs: {
    validator: (values: SpecType[]) => {
      let msg: string | undefined
      values.some(spec => {
        if (!spec.sku) {
          msg = '请输入SKU'
          return true
        }
        if (!spec.price && spec.price !== 0) {
          msg = '请输入价格'
          return true
        }
        spec.attrs.some(item => {
          if (!item.value) {
            msg = `请输入${item.label}值`
            return true
          }
        })
        if (msg) return true
        if (!spec.photo) {
          msg = '请上传商品图片'
          return true
        }
      })

      if (!msg) {
        const skus = [...new Set(values.map(item => item.sku))]
        skus.length !== values.length && (msg = 'SKU重复')
      }

      if (msg) return Promise.reject(msg)
      return Promise.resolve()
    }
  },
  desc: { required: true, message: '请输入商品描述' }
})

const { loading } = useApiRequest(
  async () => {
    const res = await goodsApi.get<typeof formState.value>(+id)
    setFormState(res)
  },
  !!id,
  null
)

const specs = ref<string[]>([specEnum.category])
const onSpecChange = (value: string[]) => {
  if (!value.length) {
    message.error('至少选择一个规格')
    return
  }
  specs.value = value
}

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (id ? goodsApi.update(+id, formState.value) : goodsApi.create(formState.value))
  message.success('操作成功')
  router.back()
}
</script>

<template>
  <c-layout-form @ok="handleSubmit" v-if="!loading">
    <a-card title="基本信息">
      <a-form-item label="礼品分类" required>
        <select-category v-model="formState.categoryId" placeholder="请选择礼品分类" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="礼品名称" required>
        <a-input v-model:value="formState.name" placeholder="请输入礼品名称" :disabled="disabled" :maxlength="32" />
      </a-form-item>
      <a-form-item label="礼品SKU" required>
        <a-input v-model:value="formState.sku" placeholder="请输入礼品SKU" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="兑换积分" required>
        <a-input-number v-model:value="formState.credit" :min="0" :max="9999" :precision="0" placeholder="请输入兑换积分" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="礼品相册" required>
        <c-upload v-model:list="formState.photos" multiple :disabled="disabled" />
      </a-form-item>
      <a-form-item label="礼品标签">
        <a-checkbox v-model:checked="formState.recommend" :disabled="disabled">推荐</a-checkbox>
        <a-checkbox v-model:checked="formState.newest" :disabled="disabled">新品</a-checkbox>
        <a-checkbox v-model:checked="formState.preferential" :disabled="disabled">特惠</a-checkbox>
      </a-form-item>
      <a-form-item label="礼品库存" required>
        <a-input-number v-model:value="formState.stock" :min="0" :max="9999" :precision="0" placeholder="请输入礼品库存" :disabled="disabled" />
      </a-form-item>
      <a-form-item label="是否上架" required>
        <a-switch v-model:checked="formState.onsale" :disabled="disabled" />
      </a-form-item>
    </a-card>
    <a-card>
      <c-rich-text v-model="formState.desc" placeholder="请输入礼品详情..." :disabled="disabled" />
    </a-card>
  </c-layout-form>
</template>
<script lang="ts" setup>
import { giftApi } from '@/api/gift'
import SelectCategory from './components/select-category.vue'

const {
  params: { id },
  path
} = useRoute()

const disabled = ref(path.includes('/detail/'))
const router = useRouter()
const { formState, setFormRules, setFormState, validFormState } = useFormState({
  categoryId: undefined,
  name: undefined,
  sku: undefined,
  credit: undefined,
  photos: [] as string[],
  recommend: false,
  newest: false,
  preferential: false,
  stock: undefined,
  onsale: false,
  desc: undefined
})

setFormRules({
  categoryId: { required: true, message: '请选择礼品分类' },
  name: { required: true, message: '请输入礼品名称' },
  sku: { required: true, message: '请输入礼品SKU' },
  credit: { required: true, message: '请输入兑换积分', allowable: true },
  photos: { required: true, message: '请上传礼品相册' },
  stock: { required: true, message: '请输入礼品库存', allowable: true },
  desc: { required: true, message: '请输入礼品详情' }
})

const { loading } = useApiRequest(
  async () => {
    const res = await giftApi.get<typeof formState.value>(+id)
    setFormState(res)
  },
  !!id,
  null
)

const handleSubmit = async () => {
  if (!(await validFormState())) return
  await (id ? giftApi.update(+id, formState.value) : giftApi.create(formState.value))
  message.success('操作成功')
  router.back()
}
</script>

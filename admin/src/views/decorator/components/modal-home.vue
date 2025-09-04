<template>
  <!-- 发货弹窗 -->
  <a-modal v-model:open="visible" :title="form ? '编辑' : '新增'" @ok="handleSubmit">
    <a-form v-bind="$config.modalCols">
      <a-form-item label="展示图" required>
        <c-upload v-model="formState.photo" />
      </a-form-item>
      <a-form-item label="跳转链接" required>
        <a-input v-model:value="formState.link" placeholder="请输入跳转链接" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
interface FormStateType {
  id: number
  photo: string
  link: string
  [key: string]: unknown
}

const emit = defineEmits<{
  (event: 'ok', value: FormStateType): void
}>()
const props = defineProps<{
  form: FormStateType | null
}>()

const visible = defineModel('visible', {
  type: Boolean,
  default: false
})

const { formState, setFormState, setFormRules, validFormState, resetFormState } = useFormState<FormStateType>({
  id: 0,
  photo: '',
  link: ''
})

setFormRules({
  photo: { required: true, message: '请上传展示图' },
  link: { required: true, message: '请输入跳转链接' }
})

const handleSubmit = async () => {
  if (!(await validFormState())) return
  emit('ok', formState.value)
}
watch(visible, value => {
  if (!value) return
  props.form ? setFormState(props.form!) : resetFormState()
})
</script>

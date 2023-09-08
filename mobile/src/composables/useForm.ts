import { cloneDeep } from '@/utils/function'
import type { RuleItem } from './types'

/**
 * 表单
 */
export const useForm = (initForm: Record<string, unknown> = {}) => {
  const formState = ref(cloneDeep(initForm))
  const formRule = ref<Record<string, RuleItem>>({})
  const resetForm = () => {
    formState.value = cloneDeep(initForm)
  }

  const setFormRule = (rule: Record<string, RuleItem> = {}) => {
    formRule.value = rule
  }

  const validatorForm = () =>
    new Promise((resolve, reject) => {
      Object.entries(formRule.value).forEach(async ([key, rule]) => {
        if (rule.validator) {
          rule.validator(rule, formState.value[key]).catch(msg => {
            uni.showToast({ title: msg, icon: 'error' })
            reject(msg)
          })
        } else if (rule.required && !formState.value[key]) {
          uni.showToast({ title: rule.message, icon: 'error' })
          reject(rule.message)
        }
      })
      resolve(true)
    })

  return { formState, resetForm, setFormRule, validatorForm }
}

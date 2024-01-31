import type { UnwrapRef } from 'vue'
import { cloneDeep } from '@/utils/function'
import type { RuleItem } from './types'

/**
 * 表单
 */
export const useForm = <T extends Record<string, unknown>>(initForm?: T) => {
  const formState = ref<T>((cloneDeep(initForm) || {}) as T)
  const formRule = ref<Record<string, RuleItem>>({})
  const resetForm = () => {
    formState.value = (cloneDeep(initForm) || {}) as UnwrapRef<T>
  }

  const setFormRules = (rule: Record<string, RuleItem> = {}) => {
    formRule.value = rule
  }

  const validatorForm = async () => {
    const tasks: Promise<unknown>[] = []
    try {
      Object.entries(formRule.value).forEach(([key, rule]) => {
        if (rule.validator) {
          tasks.push(rule.validator(rule, formState.value[key]))
        } else if (rule.required && !formState.value[key]) {
          throw new Error(rule.message)
        }
      })
      await Promise.all(tasks)
    } catch (error: unknown) {
      uni.showToast({ title: (error as Error).message, icon: 'error' })
      return false
    }
    return true
  }

  return { formState, resetForm, setFormRules, validatorForm }
}

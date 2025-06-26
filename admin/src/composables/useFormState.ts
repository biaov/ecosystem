import type { FormRule } from './types'

/**
 * 表单组合式
 */
export const useFormState = <T extends Record<string, unknown> = {}>(initFormState?: T) => {
  const formState = ref(structuredClone(initFormState ?? {}) as T)
  /**
   * 设置表单内容
   */
  const setFormState = (newFormState: T) => {
    Object.assign(formState.value, newFormState)
  }

  const rules = ref({})
  /**
   * 设置表单规则
   */
  const setFormRules = (rule = {}) => {
    rules.value = rule
  }
  const forValidaor = async (i: number, tasks: (() => Promise<unknown>)[]) => {
    await tasks[i]()
    i < tasks.length - 1 && (await forValidaor(i + 1, tasks))
  }
  /**
   * 校验表单
   */
  const validFormState = async () => {
    const validTask = Object.entries(rules.value).map(
      ([key, value]) =>
        () =>
          new Promise((resolve, reject) => {
            const { required, message: msg, validator } = value as FormRule
            const formVal = formState.value[key]
            if (required) {
              if (!formVal || (Array.isArray(formVal) && !formVal.length)) {
                msg && message.error(msg)
                reject(false)
                return
              }
            }

            if (validator) {
              validator(formVal)
                .then(() => {
                  resolve(true)
                })
                .catch(error => {
                  error && message.error(error)
                  reject(false)
                })
              return
            }
            resolve(true)
          })
    )
    try {
      validTask.length && (await forValidaor(0, validTask))
      return true
    } catch {
      return false
    }
  }

  /**
   * 初始数据
   */
  let initData: () => void

  /**
   * 重置表单状态回调
   */
  const onRestFormState = (cb: () => void) => {
    initData = cb
  }

  /**
   * 重置表单状态
   */
  const resetFormState = () => {
    formState.value = structuredClone(initFormState ?? {}) as T
    initData && initData()
  }

  return { formState, setFormState, setFormRules, validFormState, onRestFormState, resetFormState }
}

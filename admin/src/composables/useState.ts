/**
 * 设置属性展示
 */
export const useState = (initVisible: boolean = false) => {
  /**
   * 值
   */
  const state = ref(initVisible)

  /**
   * 更新值
   */
  const setState = (value: boolean) => {
    state.value = value
  }

  return [state, setState] as const
}

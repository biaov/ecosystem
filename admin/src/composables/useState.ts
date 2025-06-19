/**
 * 设置属性展示
 */
export const useState = <T = boolean>(initVisible: T | boolean = false) => {
  /**
   * 值
   */
  const state = ref(initVisible)

  /**
   * 更新值
   */
  const setState = (value: T) => {
    state.value = value
  }

  return [state, setState] as const
}

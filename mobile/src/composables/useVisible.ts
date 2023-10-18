/**
 * 显示状态
 */
export const useVisible = (initVisible = false) => {
  /**
   * 是否显示
   */
  const visible = ref(initVisible)

  /**
   * 设置显示状态
   */
  const setVisible = (value: boolean) => {
    visible.value = value
  }

  return [visible, setVisible] as const
}

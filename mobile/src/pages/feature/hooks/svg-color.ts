/**
 * svg 颜色选择器
 */
export const useSvgColor = () => {
  /**
   * 自定义颜色
   */
  const customColor = ref('')
  /**
   * 显示颜色
   */
  const showColor = ref<string[]>([])
  /**
   * 软键盘完成按钮
   */
  const onFinish = () => {
    showColor.value = [`#${customColor.value}`]
  }

  return { customColor, showColor, onFinish }
}

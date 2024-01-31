/**
 * 表单
 */
export interface FormState {
  visible: boolean
}

/**
 * 参数
 */
export interface Props {
  visible: boolean
  text: string
  onChange(value: boolean): void
}

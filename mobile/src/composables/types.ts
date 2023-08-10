/**
 * 规则选项
 */
export interface RuleItem {
  required?: boolean
  message?: string
  validator?: (rule: RuleItem, value: unknown) => Promise<string | undefined>
}

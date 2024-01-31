/**
 * 活动状态
 */
export namespace ActivityStatus {
  export interface Option {
    label: string
    value: string
    status?: 'success' | 'processing' | 'error' | 'default' | 'warning'
  }

  export type Status = 'noStart' | 'normal' | 'ended'
}

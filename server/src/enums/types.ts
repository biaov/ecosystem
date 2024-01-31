/**
 * 活动状态
 */
export namespace ActivityStatus {
  export interface Option {
    label: string
    value: string
  }

  export type Status = 'noStart' | 'normal' | 'ended'

  export interface FormatOption {
    startTime?: string
    endTime?: string
    status?: Status
  }

  export type FormatResult<T extends FormatOption> = T['status'] extends Status ? Record<string, unknown> : string
}

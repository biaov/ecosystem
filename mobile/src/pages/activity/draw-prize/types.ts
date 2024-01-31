import type { Ref } from 'vue'

/**
 * 记录数据
 */
export interface RecordDataType {
  holdName: string
}

/**
 * 活动规则类型
 */
export interface RuleDataType {
  name: string
}

/**
 * useDrawPrize hook 类型
 */
export namespace UseDrawPrize {
  export interface Option {
    activityId: Ref<number>
    deviceId: string
  }
}

/**
 * useRecordData hook 类型
 */
export namespace UseRecordData {
  export interface Option {
    activityId: Ref<number>
    deviceId: string
    isDrawn: Ref<boolean>
    drawRestful: Ref<string>
  }
}

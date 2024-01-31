/**
 * 表单 Event 事件
 */
export namespace FormEvent {
  interface BaseEvent<T> {
    detail: { value: T }
  }

  export interface InputEvent extends BaseEvent<string> {}

  export interface PickerEvent<T> extends BaseEvent<T> {}
}

/**
 * 选项
 */
export interface Option<L = string, V = string> {
  label: L
  value: V
}

/**
 * 消息响应
 */
export interface MessageResponse {
  message: string
}

/**
 * 错误对象响应
 */
export interface ErrorResponse {
  data: MessageResponse
}

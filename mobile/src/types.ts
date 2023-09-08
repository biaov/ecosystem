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

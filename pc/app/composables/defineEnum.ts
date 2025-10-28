interface DefineEnumOption {
  [key: string]: any
  options(): {
    label: string
    value: string | number
    color?: string
    [key: string]: any
  }[]
}

/**
 * 定义枚举
 */
export const defineEnum = <T extends DefineEnumOption>(option: T) =>
  Object.freeze({
    ...option,
    filter<T = string>(value: T) {
      return this.options().find(item => item.value === value)
    }
  })

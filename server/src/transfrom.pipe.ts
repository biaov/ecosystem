import { PipeTransform } from '@nestjs/common'

const dateFields = ['createdAt', 'updatedAt']

/**
 * 自定义参数处理管道
 */
export class TransfromPipe implements PipeTransform {
  transform(value: Record<string, unknown>) {
    dateFields.forEach(field => {
      const val = value[field] as string | undefined
      if (!val) return
      const filterVal = val
        .split(/[<=>]/)
        .filter(item => item)
        .map(item => item.trim())
      filterVal.length === 2 && (value[field] = filterVal)
    })
    return value
  }
}

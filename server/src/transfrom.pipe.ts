import { PipeTransform } from '@nestjs/common'

const dateFields = ['createdAt', 'updatedAt']

/**
 * 自定义参数处理管道
 */
export class TransfromPipe implements PipeTransform {
  transform(value: Record<string, unknown>, metadata: any) {
    if (!value) return
    dateFields.forEach(field => {
      const val = value[field] as string | undefined
      if (!val) return
      const filterVal = val
        .split(/[<=>]/)
        .filter(item => item)
        .map(item => item.trim())
      filterVal.length === 2 && (value[field] = filterVal)
    })
    if (metadata.type === 'query') {
      // 查询参数布尔值转换
      Object.entries(value).forEach(([key, val]) => {
        if (val === 'true') {
          value[key] = true
        } else if (val === 'false') {
          value[key] = false
        }
      })
    }

    return value
  }
}

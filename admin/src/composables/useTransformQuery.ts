import { toRaw, isRef, isReactive, Reactive } from 'vue'

const operators = ['>', '<', '!', '>=', '<=', '!=']

/**
 * 请求参数转换
 */
export const useTransformQuery = (query: Record<string, any> | Ref<Record<string, any>> | Reactive<Record<string, any>>, transfomers: Record<string, any> = {}) => {
  const form = isRef(query) ? query.value : isReactive(query) ? toRaw(query) : query
  const rawQuery = JSON.parse(JSON.stringify(form)) as Record<string, any>

  Object.keys(transfomers).forEach(key => {
    let value = rawQuery[key]
    if (!value) return
    if (typeof transfomers[key] === 'function') return transfomers[key](value, rawQuery)

    transfomers[key].split(/\|/g).forEach((transfomer: string) => {
      switch (transfomer) {
        case 'like':
          value = `%${value}%`
          break
        case 'date':
          value = dayjs(value).format('YYYY-MM-DD')
          break
        case 'dateRange':
          if (Array.isArray(value) && value.length === 2) {
            value = `>=${dayjs(value[0]).format('YYYY-MM-DD')} 00:00:00<=${dayjs(value[1]).format('YYYY-MM-DD')} 23:59:59`
          }
          break
        case 'datetime':
          value = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
          break
        case 'number':
          value = +value
          break
        case 'bool':
          value = value ? true : false
          break
        case 'string':
          value = `${value}`
          break
        case 'range':
          value = (value[0] ? `>=${value[0]} ` : '') + (value[1] ? `<=${value[1]}` : '')
          break
        default:
          if (operators.indexOf(transfomer) >= 0) {
            value = `${transfomer}${value}`
          }
          break
      }
    })

    rawQuery[key] = value
  })

  return rawQuery
}

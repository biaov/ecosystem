import { toRaw, isRef, isReactive, Reactive } from 'vue'

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
        case 'range':
          value = !value.length ? undefined : `${value[0] ? `>=${value[0]} ` : ''} ${value[1] ? `<=${value[1]}` : ''}`
          break
      }
    })

    rawQuery[key] = value
  })

  return rawQuery
}

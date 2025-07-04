import { toRaw, isRef, isReactive, Reactive } from 'vue'

type Reset<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends string ? string : T[K] extends number ? number : string
}

/**
 * 请求参数转换
 */
export const useTransformQuery = <T extends Record<string, any>>(query: T | Ref<T> | Reactive<T>, transfomers: Record<string, any> = {}, type?: string) => {
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

  const data = rawQuery as Reset<T>
  if (type === 'search') {
    const dataBak = data as unknown as SearchTransformForm
    const dataClone = structuredClone(dataBak) as Partial<SearchTransformForm>
    dataClone[dataBak.type as keyof SearchTransformForm] = dataBak.keyword
    delete dataClone.type
    delete dataClone.keyword
    return dataClone
  } else {
    return structuredClone(data)
  }
}

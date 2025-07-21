import type { Reactive } from 'vue'

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
    if (typeof transfomers[key] === 'function') {
      rawQuery[key] = transfomers[key](value, rawQuery)
      return
    }

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
    dataBak.keyword && (dataClone[dataBak.type as keyof SearchTransformForm] = dataBak.keyword)
    delete dataClone.type
    delete dataClone.keyword
    return dataClone
  } else {
    return structuredClone(data)
  }
}

/**
 * 文本域转换
 */
export const useTransfromTextarea = {
  transfromToForm: <T extends Record<string, any>, R extends keyof T>(data: T, fields: R[]) => {
    const dataClone = JSON.parse(JSON.stringify(data))
    fields.forEach(field => {
      Array.isArray(dataClone[field]) && (dataClone[field] = dataClone[field].join('\n'))
    })
    return dataClone as {
      [K in keyof T]: K extends R ? string : T[K]
    }
  },
  transfromToData: <T extends Record<string, any>, R extends keyof T, O extends keyof T>(data: T, fields: R[], options?: O[]) => {
    const dataClone = JSON.parse(JSON.stringify(data))
    fields.forEach(field => {
      dataClone[field] = dataClone[field].split('\n')
    })
    if (options?.length) {
      return options.reduce(
        (prev, key) => {
          prev[key] = dataClone[key]
          return prev
        },
        {} as {
          [K in O]: K extends R ? string[] : T[K]
        }
      )
    } else {
      return dataClone as {
        [K in keyof T]: K extends R ? string[] : T[K]
      }
    }
  }
}

const calcValue = (val1: number, val2: number, operator?: string) => {
  switch (operator) {
    case '+':
      return val1 + val2
    case '-':
      return val1 - val2
    case '*':
      return val1 * val2
    case '/':
      return val1 / val2
    default:
      return false
  }
}

export default {
  /**
   * 表格数字千分符
   */
  customRender:
    (field: string, field2?: string, operator?: string) =>
    ({ record }: { record: Record<string, unknown> }) => {
      if (field2) {
        const value = calcValue(record[field] as number, record[field2] as number, operator)
        if (value !== false) return +value.toFixed(2).toLocaleString()
      }
      return (record[field] as number).toLocaleString()
    },
  linkTarget: (url: string) => (url.includes('http') ? '_blank' : '_self')
}

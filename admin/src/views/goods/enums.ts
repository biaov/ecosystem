/**
 * 商品搜索
 */
export const goodsSearchEnum = Object.freeze({
  name: 'name',
  sku: 'sku',
  options() {
    return [
      {
        label: '商品名称',
        value: this.name
      },
      {
        label: '商品SKU',
        value: this.sku
      }
    ]
  }
})

/**
 * 上下架
 */
export const onsaleEnum = Object.freeze({
  true: true,
  false: false,
  options() {
    return [
      {
        label: '上架',
        value: this.true
      },
      {
        label: '下架',
        value: this.false
      }
    ]
  }
})

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
        value: `${this.true}`
      },
      {
        label: '下架',
        value: `${this.false}`
      }
    ]
  }
})

/**
 * 规格
 */
export const specEnum = Object.freeze({
  category: '分类',
  color: '颜色',
  quantity: '数量',
  material: '材质',
  size: '尺码',
  options() {
    return [
      {
        label: this.category,
        value: this.category
      },
      {
        label: this.color,
        value: this.color
      },
      {
        label: this.quantity,
        value: this.quantity
      },
      {
        label: this.material,
        value: this.material
      },
      {
        label: this.size,
        value: this.size
      }
    ]
  }
})

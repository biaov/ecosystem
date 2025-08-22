/**
 * 商品搜索
 */
export const goodsSearchEnum = defineEnum({
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
 * 规格
 */
export const specEnum = defineEnum({
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

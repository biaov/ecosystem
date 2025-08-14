/**
 * 礼品搜索
 */
export const giftSearchEnum = defineEnum({
  name: 'name',
  sku: 'sku',
  options() {
    return [
      {
        label: '礼品名称',
        value: this.name
      },
      {
        label: '礼品SKU',
        value: this.sku
      }
    ]
  }
})

/**
 * 礼品标签
 */
export const giftTagEnum = defineEnum({
  recommend: 'recommend',
  newest: 'newest',
  preferential: 'preferential',
  options() {
    return [
      {
        label: '推荐',
        value: this.recommend
      },
      {
        label: '新品',
        value: this.newest
      },
      {
        label: '特惠',
        value: this.preferential
      }
    ]
  }
})

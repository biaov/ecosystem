/**
 * 订单类型
 */
export const orderTypeEnum = defineEnum({
  entity: 'entity',
  virtual: 'virtual',
  options() {
    return [
      {
        label: '实物商品',
        value: this.entity
      },
      {
        label: '虚拟商品',
        value: this.virtual
      }
    ]
  }
})

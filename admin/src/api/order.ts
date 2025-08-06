/**
 * 购物订单
 */
export const orderApi = useRestful('admin/order')

/**
 * 订单发货
 */
export const orderShippedApi = (id: number) => useCommand(`admin/order/${id}/shipped`)

/**
 * 积分订单
 */
export const creditOrderApi = useRestful('admin/credit-order')

/**
 * 积分订单发货
 */
export const creditOrderShippedApi = (id: number) => useCommand(`admin/credit-order/${id}/shipped`)

/**
 * 售后退款
 */
export const saleOrderApi = useRestful('admin/sale-order')

/**
 * 售后订单签收
 */
export const saleOrderReceiveApi = (id: number) => useCommand(`admin/sale-order/${id}/receive`)

/**
 * 售后订单审核
 */
export const saleOrderExamineApi = (id: number) => useCommand(`admin/sale-order/${id}/examine`)

/**
 * 售后订单退款
 */
export const saleOrderRefundApi = (id: number) => useCommand(`admin/sale-order/${id}/refund`)

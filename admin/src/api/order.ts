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

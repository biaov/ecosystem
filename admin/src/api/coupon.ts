/**
 * 优惠券
 */
export const couponApi = useRestful('admin/coupon')

/**
 * 优惠券统计信息
 */
export const couponStatisticInfoApi = (couponId: number) => useCommand(`admin/coupon/${couponId}/statistic-info`)

/**
 * 优惠券统计
 */
export const couponStatisticApi = (couponId: number) => useRestful(`admin/coupon/${couponId}/statistic`)

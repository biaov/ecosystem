/**
 * 商品
 */
export const goodsApi = useRestful('pc/goods')

/**
 * 商品分类
 */
export const goodsCategoryApi = useRestful('pc/goods-category')

/**
 * 加购
 */
export const cartApi = useRestful('pc/cart')

/**
 * 购物车全选 / 取消全选
 */
export const cartSelectAllApi = useCommand('pc/cart/select-all')

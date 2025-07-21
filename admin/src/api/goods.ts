// import { useStore } from '@/store/auth'
const { state } = useStore()

/**
 * 商品
 */
export const goodsApi = useRestful('admin/goods')

/**
 * 上下架商品
 */
export const goodsOnsaleApi = (id: number) => useCommand(`admin/goods/${id}/onsale`)

/**
 * 商品分类
 */
export const goodsCategoryApi = useRestful('admin/goods-category')

/**
 * 商品库存
 */
export const goodsStockApi = useRestful('admin/goods-stock')

/**
 * 商品库存-下载模版
 */
export const goodsStockTemplateDownloadApi = useDownloadURL('admin/goods-stock/template/download')

/**
 * 商品库存-导入库存
 */
export const goodsStockImportApi = useDownloadURL('admin/goods-stock/import/stock', true)

/**
 * 礼品
 */
export const giftApi = useRestful('admin/gift')

/**
 * 上下架礼品
 */
export const giftOnsaleApi = (id: number) => useCommand(`admin/gift/${id}/onsale`)

/**
 * 礼品分类
 */
export const giftCategoryApi = useRestful('admin/gift-category')

/**
 * 礼品库存-下载模版
 */
export const giftTemplateDownloadApi = useCommand('admin/gift/template/download').token()

/**
 * 礼品库存-导入库存
 */
export const giftImportApi = useCommand('admin/gift/import/stock').token()

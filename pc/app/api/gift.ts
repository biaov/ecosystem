/**
 * 礼品
 */
export const giftApi = useRestful('pc/gift')

/**
 * 上下架礼品
 */
export const giftOnsaleApi = (id: number) => useCommand(`admin/gift/${id}/onsale`)

/**
 * 礼品分类
 */
export const giftCategoryApi = useRestful('pc/gift-category')

/**
 * 礼品库存-下载模版
 */
export const giftTemplateDownloadApi = useCommand('pc/gift/template/download').token()

/**
 * 礼品库存-导入库存
 */
export const giftImportApi = useCommand('pc/gift/import/stock').token()

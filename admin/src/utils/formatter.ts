import config from '@/config'

export default {
  /**
   * 设置分页
   */
  pagination: ({ current, pageSize, total }: Partial<PageDataType<unknown>> = {}) => ({
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
    showTotal: (total: number) => `共${total}条`,
    current: current || config.pagination.current,
    pageSize: pageSize || config.pagination.pageSize,
    total: total || 0
  })
}

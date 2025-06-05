import { pagination } from '@/config'
import { Pagination } from './types'

/**
 * 分页
 */
export const usePagination = () => {
  /**
   * 分页转换
   */
  const transformPagination = ({ pageSize = pagination.pageSize, current = pagination.current, total = 0 } = {}): Pagination => ({
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
    showTotal: (curTotal: number) => `共${curTotal}条`,
    current,
    pageSize,
    total
  })

  return { transformPagination }
}

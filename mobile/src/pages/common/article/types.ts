/**
 * 文章数据类型
 */
export interface ArticleDataType {
  id: number
  title: string
  coverUrl: string
  content: string
  createdAt: string
  updatedAt: string
  [key: string]: string | number
}

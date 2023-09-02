import { validatorLogin } from '@/utils/function'
import type { CellListItem } from './types'

/**
 * 行列表
 */
export const useCell = () => {
  const cellList = ref<CellListItem[]>([
    {
      iconName: 'user-info',
      name: '用户信息',
      url: '/pages/user/info',
      needLogin: true
    },
    {
      iconName: 'list',
      name: '文章列表',
      url: '/pages/common/article/list'
    },
    {
      iconName: 'notice',
      name: '公告列表',
      url: '/pages/common/notice/list'
    },
    {
      iconName: 'help',
      name: '帮助中心',
      url: '/pages/user/help'
    },
    {
      iconName: 'about',
      name: '关于我们',
      url: '/pages/user/about'
    }
  ])
  const onClickCell = ({ url, needLogin }: CellListItem) => {
    if (needLogin && !validatorLogin()) return
    uni.navigateTo({ url })
  }

  return { cellList, onClickCell }
}

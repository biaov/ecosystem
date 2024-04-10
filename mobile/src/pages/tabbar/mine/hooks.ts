import { validatorLogin } from '@/utils/function'
import { useVisible } from '@/composables/useVisible'
import type { CellListItem } from './types'

/**
 * 行列表
 */
export const useCell = () => {
  const [checkUpdateVisible, setCheckUpdateVisible] = useVisible()
  const cellList = ref<CellListItem[]>([
    {
      iconName: 'user-info',
      name: '用户信息',
      url: '/pages/user/info',
      needLogin: true
    },
    {
      iconName: 'notice',
      name: '公告列表',
      url: '/pages/common/notice/list'
    },
    {
      iconName: 'list',
      name: '文章列表',
      url: '/pages/common/article/list'
    },
    {
      iconName: 'help',
      name: '帮助中心',
      url: '/pages/user/help',
      gap: true
    },
    {
      iconName: 'about',
      name: '关于我们',
      url: '/pages/user/about'
    },
    {
      iconName: 'check-update',
      name: '检查更新'
    }
  ])
  const onClickCell = ({ url, needLogin, iconName }: CellListItem) => {
    if (needLogin && !validatorLogin()) return
    switch (iconName) {
      case 'check-update':
        setCheckUpdateVisible(true)
        break
      default:
        url && uni.navigateTo({ url })
        break
    }
  }

  return { checkUpdateVisible, cellList, onClickCell }
}

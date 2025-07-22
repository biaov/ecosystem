import { writeFileSync } from 'fs'
import { menuRoutes } from '../src/router/routes.ts'
import type { permissionEnum as permissionEnums } from '../src/enums/index.ts'

type keyValue = keyof typeof permissionEnums
const permissionEnum: Record<keyValue, keyValue> = { list: 'list', create: 'create', update: 'update', delete: 'delete' }
const menuRoutesFilter = menuRoutes.filter(route => route.name !== '403')
const getRoutes = (list: any[], parentId = 0) => {
  const second: any[] = []
  const first = list
    .filter(item => !item.meta.hidden)
    .map((item, i) => {
      const id = i + 1
      let type = 'module'
      const newParentId = parentId + id
      if (item.children?.length) {
        second.push(...getRoutes(item.children, newParentId)[0])
      } else {
        type = 'page'
      }
      return {
        id,
        name: item.meta.title,
        parentId,
        content: item.path,
        type
      }
    })
  return [first, second]
}

interface MenuItem {
  id: number
  name: string
  parentId: number
  content: string
  type: string
}

const getValue = (list: MenuItem[]) =>
  `INSERT INTO \`eco_menu\` (\`name\`, \`parentId\`, \`content\`, \`type\`) VALUES ${list.reduce((prev, item, i) => `${prev}${i ? ',' : ''}('${item.name}', ${item.parentId || 'NULL'}, '${item.content}', '${item.type}')`, '')};`

const [first, second] = getRoutes(menuRoutesFilter)
const threeGroup = structuredClone(first.filter(item => item.type === 'page').concat(second.map((item, i) => ({ ...item, id: first.length + i + 1 }))))
const keys = Object.values(permissionEnum)
const three = threeGroup
  .map(item => {
    const actions: Omit<MenuItem, 'id'>[] = keys
      .filter(value => {
        if (['商品库存'].includes(item.name)) return [permissionEnum.list, permissionEnum.update].includes(value)
        if (['全部用户'].includes(item.name)) return [permissionEnum.list, permissionEnum.create].includes(value)
        if (['仪表面板', '拉黑名单'].includes(item.name)) return permissionEnum.list === value
        if (['用户设置', '隐私协议', '订单设置', '热搜词设置'].includes(item.name)) return value !== permissionEnum.delete
        return true
      })
      .map(value => {
        let name = ''

        switch (value) {
          case permissionEnum.list:
            name = '浏览'
            break
          case permissionEnum.create:
            name = '创建'
            break
          case permissionEnum.update:
            name = '更新'
            break
          case permissionEnum.delete:
            name = '删除'
            break
        }
        return {
          name,
          parentId: item.id,
          content: value,
          type: 'action'
        }
      })
    if (item.content === 'role' && item.name === '角色权限') {
      actions.push({
        name: '分配权限',
        parentId: item.id,
        content: 'permission',
        type: 'action'
      })
    }

    if ((item.content === 'stock' && item.name === '商品库存') || (item.content === 'list' && item.name === '全部礼品')) {
      actions.push(
        ...[
          {
            name: '下载模板',
            parentId: item.id,
            content: 'downloadTemplate',
            type: 'action'
          },
          {
            name: '导入库存',
            parentId: item.id,
            content: 'importStock',
            type: 'action'
          }
        ]
      )
    }

    if (item.content === 'stock' && item.name === '礼品库存') {
      actions.push(
        ...[
          {
            name: '下载模板',
            parentId: item.id,
            content: 'downloadTemplate',
            type: 'action'
          },
          {
            name: '导入库存',
            parentId: item.id,
            content: 'importStock',
            type: 'action'
          }
        ]
      )
    }

    if (item.content === 'account' && item.name === '账号设置') {
      actions.push({
        name: '重置密码',
        parentId: item.id,
        content: 'reset-pwd',
        type: 'action'
      })
    }

    if (item.content === 'blocklist' && item.name === '拉黑名单') {
      actions.push({
        name: '拉黑',
        parentId: item.id,
        content: 'block',
        type: 'action'
      })
    }

    return actions
  })
  .flat()

const [firstSql, secondSql, threeSql] = [first, second, three].map(getValue)
writeFileSync('./scripts/menu.sql', `${firstSql}\n${secondSql}\n${threeSql}`)

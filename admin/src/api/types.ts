export namespace PermissionName {
  export interface MenuDataType extends IdDataType {
    name: string
    content: string
    children?: MenuDataType[]
    [key: string]: any
  }
  export interface RoleDataType extends IdDataType {
    name: string
    code: string
    permissions: string[]
  }
  export interface GroupMenuRole {
    name: string
    content: string
    type: string
    checked: string[]
    children: (GroupMenuRole & {
      label: string
      value: string
    })[]
  }
}

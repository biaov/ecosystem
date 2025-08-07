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

export namespace UserName {
  export interface UserInfo extends IdDataType {
    nickname: string
    avatar: string
    mobile: string
    email: string
  }
}

interface AddressType {
  province: string
  city: string
  district: string
  address: string
  name: string
  mobile: string
}

export namespace OrderName {
  interface InvoiceType {
    type: string
    title: string
    no: string
    bank?: string
    bankAccount?: string
    mobile?: string
    address?: string
  }
  export interface OrderItemType extends IdDataType {
    sku: string
    goodsName: string
    goodsPrice: string
    goodsPhoto: string
    quantity: string
  }
  export interface OrderTraceType extends IdDataType {
    expressSn: string
    expressCode: string
    traces: {
      date: string
      message: string
    }[]
  }
  export interface OrderDataType extends AddressType, IdDataType {
    sn: string
    status: string
    source: string
    totalAmount: string
    payAmount: number
    discountAmount: number
    remark: string
    payTime: string
    type: string
    payType: string
    user: UserName.UserInfo
    items: OrderItemType[]
    trace: OrderTraceType
    invoice: InvoiceType
  }
  export interface CreditOrderDataType extends AddressType, IdDataType {
    sn: string
    status: string
    source: string
    credit: number
    remark: string
    type: string
    user: UserName.UserInfo
    items: OrderItemType[]
    trace: OrderTraceType
  }
  export interface SaleOrderDataType extends IdDataType {
    sn: string
    status: string
    type: string
    reason: string
    result: string
    refundAmount: number
    user: UserName.UserInfo
    order: OrderDataType
    trace: OrderTraceType
  }
}

export namespace CouponName {
  export interface CouponType extends IdDataType {
    send: number
    used: number
    expired: number
  }
}

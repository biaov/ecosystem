interface Point {
  x: number
  y: number
}

interface TokenValue {
  userId?: string
}

interface PageOption {
  skip: number
  take: number
  current: number
  pageSize: number
}

type AddressUnion = 'province' | 'city' | 'district' | 'address' | 'name' | 'mobile'

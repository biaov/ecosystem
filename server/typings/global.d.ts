import { Repository } from 'typeorm'

declare global {
  import('typeorm')
  export type { Repository }

  export type { Redis } from 'ioredis'
  import('ioredis')

  export interface Point {
    x: number
    y: number
  }
}

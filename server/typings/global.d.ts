import { Repository } from 'typeorm'

declare global {
  import('typeorm')
  export type { Repository }
}

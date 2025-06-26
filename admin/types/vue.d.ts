import formatter from '@/utils/formatter'
import config from '@/config'

declare module 'vue' {
  interface ComponentCustomProperties {
    $formatter: typeof formatter
    $config: typeof config
  }
}

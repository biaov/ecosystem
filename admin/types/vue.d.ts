import formatter from '@/utils/formatter'

declare module 'vue' {
  interface ComponentCustomProperties {
    $formatter: typeof formatter
  }
}

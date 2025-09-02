import formatter from '@/utils/formatter'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.config.globalProperties.$formatter = formatter
  nuxtApp.vueApp.config.globalProperties.isClient = import.meta.client
})

import mineh5ui from 'mine-h5-ui'
import 'mine-h5-ui/styles/index.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(mineh5ui)
})

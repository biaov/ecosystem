import mineh5ui from 'mine-h5-ui'
import 'mine-h5-ui/styles/index.css'
import 'virtual:svg-icons-register'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(mineh5ui)
})

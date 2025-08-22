import App from '@/App.vue'
import plugins from '@/plugins'
import '@/styles/reset.less'

const app = createApp(App)
app.use(plugins)
app.mount('#app')

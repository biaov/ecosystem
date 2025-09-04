export default defineNuxtRouteMiddleware(to => {
  const { isLogin } = useStore()
  if (isLogin.value) {
    if (['/login', '/register'].includes(to.path)) return navigateTo('/user')
  } else if (to.path.includes('/user')) {
    return navigateTo('/login')
  }
})

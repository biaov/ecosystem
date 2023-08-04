import { configureStore } from '@reduxjs/toolkit'
import { getStorage } from '@/utils/storage'
import { authSlice } from './reducer'

const store = configureStore({
  reducer: authSlice.reducer
})

const authInfo = getStorage('authInfo')
authInfo && store.dispatch(authSlice.actions.login(authInfo))

export { authSlice }

export default store

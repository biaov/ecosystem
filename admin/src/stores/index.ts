import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './reducer'

const store = configureStore({
  reducer: counterSlice.reducer
})

export { counterSlice }

export default store

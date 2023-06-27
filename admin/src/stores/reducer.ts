/* import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'home',
  initialState: {
    isShowModal: false
  },
  reducers: {
    showModal(state) {
      state.isShowModal = true
    },
    hideModal(state) {
      state.isShowModal = false
    }
  }
})

export const { showModal, hideModal } = slice.actions
export default slice.reducer
 */

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    token: ''
  },
  reducers: {
    login: state => {
      state.token = 'token'
    },
    logout: state => {
      state.token = ''
    }
  }
})

// export const { incremented, decremented } = counterSlice.actions

// const store = configureStore({
//   reducer: counterSlice.reducer
// })

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented())
// // { value: 1 }
// store.dispatch(incremented())
// // { value: 2 }
// store.dispatch(decremented())
// // { value: 1 }

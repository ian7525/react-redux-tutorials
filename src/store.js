import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store

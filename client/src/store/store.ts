import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import stateElement from '../components/SettingMenu/StateElementSlice'

const store = configureStore({
  reducer: {stateElement},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
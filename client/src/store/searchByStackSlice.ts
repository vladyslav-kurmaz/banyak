import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

type SearchByStackStateType = {
  stack: string
}

const initialState: SearchByStackStateType = {
  stack: '',
}

export const serchByStackSlice = createSlice({
  name: 'serchByStack',
  initialState,
  reducers: {
    setStack: (state, action: PayloadAction<SearchByStackStateType>) => {
      state.stack = action.payload.stack
    },
  },
})

export const { setStack } = serchByStackSlice.actions

export const selectSerchByStack = (state: RootState) => state.searchByStack

export default serchByStackSlice.reducer

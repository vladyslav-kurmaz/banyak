import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

type SearchByStackStateType = {
  stack: string
}

const initialState: SearchByStackStateType = {
  stack: '',
}

export const searchByStackSlice = createSlice({
  name: 'searchByStack',
  initialState,
  reducers: {
    setStack: (state, action: PayloadAction<SearchByStackStateType>) => {
      state.stack = action.payload.stack
    },
  },
})

export const { setStack } = searchByStackSlice.actions

export const selectSearchByStack = (state: RootState) => state.searchByStack

export default searchByStackSlice.reducer

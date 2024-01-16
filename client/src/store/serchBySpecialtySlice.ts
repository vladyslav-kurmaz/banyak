import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

type SerchBySpecialtyStateType = {
  specialty: string
}

const initialState: SerchBySpecialtyStateType = {
  specialty: '',
}

export const serchBySpecialtySlice = createSlice({
  name: 'serchBySpecialty',
  initialState,
  reducers: {
    setSpecialty: (state, action: PayloadAction<SerchBySpecialtyStateType>) => {
      state.specialty = action.payload.specialty
    },
  },
})

export const { setSpecialty } = serchBySpecialtySlice.actions

export const selectSerchBySpecialty = (state: RootState) =>
  state.serchBySpecialty.specialty

export default serchBySpecialtySlice.reducer

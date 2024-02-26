import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

type SearchBySpecialtyStateType = {
  specialty: string
}

const initialState: SearchBySpecialtyStateType = {
  specialty: '',
}

export const searchBySpecialtySlice = createSlice({
  name: 'searchBySpecialty',
  initialState,
  reducers: {
    setSpecialty: (
      state,
      action: PayloadAction<SearchBySpecialtyStateType>
    ) => {
      state.specialty = action.payload.specialty
    },
  },
})

export const { setSpecialty } = searchBySpecialtySlice.actions

export const selectSearchBySpecialty = (state: RootState) =>
  state.searchBySpecialty

export default searchBySpecialtySlice.reducer

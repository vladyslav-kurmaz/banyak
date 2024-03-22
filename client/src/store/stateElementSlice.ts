import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { stateElement } from '../types/types'

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: 'УКР',
  mainTheme: true,
  mainPageSlider: 0,
  statusInstr: null, //'Власник ідеї'
  loginRegistrationForm: false,
  loginOrSingUp: 'ВХІД',
  counterLink: 0,
  mainPreloader: false,
  errorStatus: null,
}

const stateElementSlice = createSlice({
  name: 'stateElement',
  initialState,
  reducers: {
    changeOpenHeaderSetting: (state, action: PayloadAction<boolean>) => {
      state.headerSetting = action.payload
    },
    changeLanguage: (state, action: PayloadAction<string | null>) => {
      state.mainLanguage = action.payload
    },
    changeTheme: (state, action: PayloadAction<boolean>) => {
      state.mainTheme = action.payload
    },
    changeMainPageSlider: (state, action: PayloadAction<0 | 1>) => {
      state.mainPageSlider = action.payload
    },
    changeStatusInstr: (state, action: PayloadAction<string | null>) => {
      if (action.payload === 'Власник ідеї' || action.payload === 'Талант') {
        state.statusInstr = action.payload
      } else {
        throw new Error('Invalid status: ' + action.payload)
      }
    },
    changeOpenOrCloseLoginPopup: (state, action: PayloadAction<boolean>) => {
      state.loginRegistrationForm = action.payload
    },
    changeLoginOrSingUp: (state, action: PayloadAction<string | null>) => {
      state.loginOrSingUp = action.payload
    },
    changeCounterLink: (state) => {
      state.counterLink = state.counterLink + 1
    },
    changeMainPreloader: (state, action: PayloadAction<boolean>) => {
      state.mainPreloader = action.payload
    },
    setErrorStatus: (state, action: PayloadAction<unknown>) => {
      state.errorStatus = action.payload
    },
  },
})

const { actions, reducer } = stateElementSlice

export const {
  changeOpenHeaderSetting,
  changeLanguage,
  changeTheme,
  changeMainPageSlider,
  changeStatusInstr,
  changeOpenOrCloseLoginPopup,
  changeLoginOrSingUp,
  changeCounterLink,
  changeMainPreloader,
  setErrorStatus,
} = actions

export const selectStateElement = (state: RootState) => state.stateElement
export default reducer

import { createSlice } from '@reduxjs/toolkit'
import { stateElement } from '../../types/types'

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: 'УКР',
  mainTheme: true,
  mainPageSlider: 0,
  statusInstr: 'Власник ідеї',
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
    changeOpenHeaderSetting: (state, action) => {
      state.headerSetting = action.payload
    },
    changeLanguage: (state, action) => {
      state.mainLanguage = action.payload
    },
    changeTheme: (state, action) => {
      state.mainTheme = action.payload
    },
    changeMainPageSlider: (state, action) => {
      state.mainPageSlider = action.payload
    },
    changeStatusInstr: (state, action) => {
      state.statusInstr = action.payload
    },
    changeOpenOrCloseLoginPopup: (state, action) => {
      state.loginRegistrationForm = action.payload
    },
    changeLoginOrSingUp: (state, action) => {
      state.loginOrSingUp = action.payload
    },
    changeCounterLink: (state) => {
      state.counterLink = state.counterLink + 1
    },
    changeMainPreloader: (state, action) => {
      state.mainPreloader = action.payload
    },
    changeErrorStatus: (state, action) => {
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
  changeErrorStatus,
} = actions
export default reducer

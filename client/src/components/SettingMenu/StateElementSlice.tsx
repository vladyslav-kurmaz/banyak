import { createSlice } from "@reduxjs/toolkit";
import { stateElement } from "../../types/types";

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: "УКР",
  mainTheam: true,
  mainPageSlider: 0,
  statusInstr: 'Власник ідеї',
  loginRegistrationForm: false,
  loginOrSingUp: 'ВХІД',
  counterLink: 0,
  mainPreloader: false,
  errorStatus: null,
};

const stateElementSlice = createSlice({
  name: "stateElement",
  initialState,
  reducers: {
    changeOpenHeaderSeting: (state, action) => {
      state.headerSetting = action.payload;
    },
    changeLanguage: (state, action) => {
      state.mainLanguage = action.payload;
    },
    changeTheam: (state, action) => {
      state.mainTheam = action.payload;
    },
    changeMainPageSlider: (state, action) => {
      state.mainPageSlider = action.payload;
    },
    changeStatusInstr: (state, action) => {
      state.statusInstr = action.payload;
    },
    changeOpenOrCloseLoginPopup: (state, action) => {
      state.loginRegistrationForm = action.payload;
    },
    changeLoginOrSingUp: (state, action) => {
      state.loginOrSingUp = action.payload;
    },
    changeCounterLink: (state) => {
      state.counterLink = state.counterLink + 1;
    },
    changreMainPreloader: (state, action) => {
      state.mainPreloader = action.payload;
    },
    changeErrorStatus: (state, action) => {
      state.errorStatus = action.payload
    }
  },
});

const { actions, reducer } = stateElementSlice;

export const {
  changeOpenHeaderSeting,
  changeLanguage,
  changeTheam,
  changeMainPageSlider,
  changeStatusInstr,
  changeOpenOrCloseLoginPopup,
  changeLoginOrSingUp,
  changeCounterLink,
  changreMainPreloader,
  changeErrorStatus
} = actions;
export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import { stateElement } from "../../types/types";

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: "УКР",
  mainTheam: true,
  mainSlider: 0,
  mainPageSlider: 0,
  statusInstr: 'Власник ідеї',
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
    changeSlider: (state, action) => {
      state.mainSlider = action.payload;
    },
    changeMainPageSlider: (state, action) => {
      state.mainPageSlider = action.payload;
    },
    changeStatusInstr: (state, action) => {
      state.statusInstr = action.payload;
    }
  },
});

const { actions, reducer } = stateElementSlice;

export const {
  changeOpenHeaderSeting,
  changeLanguage,
  changeTheam,
  changeSlider,
  changeMainPageSlider,
  changeStatusInstr,
} = actions;
export default reducer;

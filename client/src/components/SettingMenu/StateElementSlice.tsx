import { createSlice } from "@reduxjs/toolkit";
import { stateElement } from "../../types/types";

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: 'ua',
  mainTheam: true,
  mainSlider: 0
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
  },
});

const {actions, reducer} = stateElementSlice

export const { changeOpenHeaderSeting, changeLanguage, changeTheam, changeSlider } = actions;
export default reducer;

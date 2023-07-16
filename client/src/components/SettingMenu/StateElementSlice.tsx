import { createSlice } from "@reduxjs/toolkit";
import { stateElement } from "../../types/types";

const initialState: stateElement = {
  headerSetting: false,
  mainLanguage: 'ua'
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
  },
});

const {actions, reducer} = stateElementSlice

export const { changeOpenHeaderSeting, changeLanguage } = actions;
export default reducer;

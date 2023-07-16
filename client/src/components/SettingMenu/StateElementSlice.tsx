import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerSetting: false,
};

const stateElementSlice = createSlice({
  name: "stateElement",
  initialState,
  reducers: {
    changeOpenHeaderSeting: (state, action) => {
      state.headerSetting = action.payload;
    },
  },
});

const {actions, reducer} = stateElementSlice

export const { changeOpenHeaderSeting } = actions;
export default reducer;

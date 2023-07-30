import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "../types/types";

const initialState: userInfo = {
  userId: null
}

const userInform = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {

  }
})

const {reducer, actions} = userInform;

export default reducer;
export const {} = actions;
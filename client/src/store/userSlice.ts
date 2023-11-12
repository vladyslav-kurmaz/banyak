import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "../types/types";

const initialState: userInfo = {
  // userId: null,
  userProfile: null,
  typeUser: 'Я талант'
}

const userInform = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // changeActiveId: (state, action) => {
    //   state.userId = action.payload
    // },
    changeTypeUser: (state, action) => {
      state.typeUser = action.payload
    },
    changeUserProfile: (state, action) => {
      state.userProfile = action.payload
    }
  }
})

const {reducer, actions} = userInform;

export default reducer;
export const {
  // changeActiveId,
  changeTypeUser,
  changeUserProfile
} = actions;

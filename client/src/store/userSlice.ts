import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import {
  TGetAllStack,
  TUserProfile,
  TUpdateAvatar,
  userInfo,
} from '../types/types'

const initialState: userInfo = {
  // userId: null,
  userProfile: null,
  typeUser: true, //true means that user is Talent
  allStack: [],
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    // changeActiveId: (state, action) => {
    //   state.userId = action.payload
    // },
    setTypeUser: (state, action: PayloadAction<boolean>) => {
      state.typeUser = action.payload
    },
    setUserProfile: (state, action: PayloadAction<TUserProfile | null>) => {
      state.userProfile = action.payload
    },
    setUserProfileAvatar: (state, action: PayloadAction<TUpdateAvatar>) => {
      if (state.userProfile) state.userProfile.avatar = action.payload
    },
    setAllStack: (state, action: PayloadAction<TGetAllStack>) => {
      state.allStack = action.payload
    },
  },
})

export const {
  setUserProfile,
  setAllStack,
  setTypeUser,
  setUserProfileAvatar,
} = userInfoSlice.actions

export const selectUserInfo = (state: RootState) => state.userInfo

export default userInfoSlice.reducer

// const userInform = createSlice({
//   name: 'userInfo',
//   initialState,
//   reducers: {
//     // changeActiveId: (state, action) => {
//     //   state.userId = action.payload
//     // },
//     changeTypeUser: (state, action) => {
//       state.typeUser = action.payload
//     },
//     changeUserProfile: (state, action) => {
//       state.userProfile = action.payload
//     },
//     changeAllStack: (state, action) => {
//       state.allStack = action.payload
//     }

//   }
// })

// const {reducer, actions} = userInform;

// export default reducer;
// export const {
//   // changeActiveId,
//   changeTypeUser,
//   changeUserProfile,
//   changeAllStack
// } = actions;

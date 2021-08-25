import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, UserType, UserDataType, taskType } from '../types'

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user')!),
  userData: JSON.parse(localStorage.getItem('userData')!),
  editTask: undefined,
  isAuth: !!JSON.parse(localStorage.getItem('user')!),
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserDataType | undefined>) => {
      state.userData = action.payload;
    },
    setEditTask: (state, action: PayloadAction<taskType | undefined>) => {
      state.editTask = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean | undefined>) => {
      state.isAuth = action.payload!;
    },
  },
});

export const { setUser, setUserData, setEditTask, setIsAuth } = UserSlice.actions;

export default UserSlice.reducer;

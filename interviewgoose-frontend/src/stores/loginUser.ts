import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_USER } from "@/constant/user";

/**
 * Logged in User Global State
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});

// modify the state
export const { setLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;

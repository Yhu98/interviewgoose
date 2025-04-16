import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Default User
const DEFAULT_USER: API.LoginUserVO = {
    userName: "No user logged in",
    userProfile: "Nothing to say here ......",
    userAvatar: "/assets/notLoginUser.png",
    userRole: "guest",
};

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

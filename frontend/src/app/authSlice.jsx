import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authState",
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginUser: (state, param) => {
            return { ...param.payload, isLoggedIn: true };
        },
        logoutUser: (state) => {
            return { isLoggedIn: false };
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice;

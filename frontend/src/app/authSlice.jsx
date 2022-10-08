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
        editUser: (state, param) => {
            let old = Object.assign({}, state)
            old.user = ({ ...old.user, ...param.payload })
            return old
        },
        updateAddr: (state, param) => {
            let old = Object.assign({}, state)
            old.user = ({ ...old.user, address: param.payload })
            return old
        }
    },
});

export const { loginUser, logoutUser, editUser, updateAddr } = authSlice.actions;
export default authSlice;

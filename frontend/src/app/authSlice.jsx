import { createSlice } from "@reduxjs/toolkit";

// const initUser = () => {

//     let defaultUser = { isLoggedIn: false };
//     let loadedUser = JSON.parse(localStorage.getItem("user"));

//     if (loadedUser === null) {
//         localStorage.setItem("user", JSON.stringify(defaultUser));
//     }

//     else if (loadedUser.isLoggedIn)
//         return loadedUser;

//     return defaultUser;
// }


const authSlice = createSlice({
    name: 'authState',
    initialState: {
        user: { isLoggedIn: false }
    },
    reducers: {
        loginUser: (state, param) => {
            state.user = { ...param.payload, isLoggedIn: true };
            // localStorage.setItem("user", JSON.stringify(state.user));
        },
        logoutUser: (state, param) => {
            state.user = { isLoggedIn: false };
            // localStorage.setItem("user", JSON.stringify(state.user));
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice;
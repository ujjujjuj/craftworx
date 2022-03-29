import { useState, useContext, createContext, useEffect } from "react";

export const AuthContext = createContext({ isLoggedIn: false });
export const useAuth = () => useContext(AuthContext);

const useProvideAuth = () => {
    const [user, setUser] = useState({ isLoggedIn: false });

    const loginUser = (data) => {
        let newUser = { ...data, isLoggedIn: true };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logoutUser = () => {
        let newUser = { isLoggedIn: false };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    useEffect(() => {
        let loadedUser = JSON.parse(localStorage.getItem("user"));

        if (loadedUser === null) return localStorage.setItem("user", JSON.stringify(user));
        if (loadedUser.isLoggedIn) return loginUser(loadedUser);
    }, []);

    useEffect(() => {
        // console.log(user);
    }, [user]);

    return {
        user,
        loginUser,
        logoutUser,
    };
};

export const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={useProvideAuth()}>{children}</AuthContext.Provider>
);

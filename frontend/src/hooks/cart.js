import { useState, useContext, createContext, useEffect } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    return <CartContext.Provider value={useProvideCart()}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export const useProvideCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let loadedCart = JSON.parse(localStorage.getItem("cart"));

        if (loadedCart === null) return localStorage.setItem("cart", JSON.stringify(cart));
        setCart(loadedCart);
    }, []);

    return { cart };
};

import { useState, useContext, createContext } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    return <CartContext.Provider value={useProvideCart()}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export const useProvideCart = () => {
    const [cart, setCart] = useState([]);

    return { cart };
};

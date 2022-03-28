import { useState, useContext, createContext, useEffect } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
    return <CartContext.Provider value={useProvideCart()}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export const useProvideCart = () => {
    const [cart, setCart] = useState({
        isExpanded: false,
        items: {},
    });

    const toggleCart = () => {
        setCart({ ...cart, isExpanded: !cart.isExpanded });
    };

    const setCartItem = (product, amount) => {
        let quantity = (cart.items[product.id]?.quantity || 0) + amount;
        if (quantity === 0) {
            setCart((cart) => {
                let newCart = Object.assign({}, cart);
                delete newCart.items[product.id];
                return newCart;
            });
        } else {
            setCart((cart) => {
                let newCart = Object.assign({}, cart);
                newCart.items[product.id] = { ...product, quantity };
                return newCart;
            });
        }
    };

    const deleteCartItem = (id) => {
        setCart((cart) => {
            let newCart = Object.assign({}, cart);
            delete newCart.items[id];
            return newCart;
        });
    };

    const getCheckoutCart = () => {
        let checkoutCart = {};
        Object.entries(cart.items).forEach(([productId, product]) => {
            checkoutCart[productId] = product.quantity;
        });
        return checkoutCart;
    };

    useEffect(() => {
        let storedCart = localStorage.getItem("cart");
        if (storedCart.length > 0) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return { cart, toggleCart, setCartItem, deleteCartItem, getCheckoutCart };
};

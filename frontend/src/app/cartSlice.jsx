import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cartState",
    initialState: {
        isExpanded: false,
        items: {},
    },
    reducers: {
        toggleCart: (state, params) => {
            if (params.payload !== undefined) {
                state.isExpanded = params.payload
            }
            else
                state.isExpanded = !state.isExpanded;
        },
        setCartItem: (state, params) => {
            let { product, amount } = params.payload;
            let quantity = (state.items[product.id]?.quantity || 0) + amount;
            let newCart = Object.assign({}, state);
            if (quantity === 0) {
                delete newCart.items[product.id];
            } else {
                newCart.items[product.id] = { ...product, quantity };
            }
            state = newCart;
        },
        deleteCartItem: (state, params) => {
            delete state.items[params.payload];
        },
        emptyCart: (state) => {
            state.items = {};
        },
    },
});

export const getCheckoutCart = (state) => {
    let checkoutCart = {};
    Object.entries(state.cartState.items).forEach(([productId, product]) => {
        checkoutCart[productId] = product.quantity;
    });
    return checkoutCart;
};

export const getCartSize = (state) => {
    let n = 0;
    Object.entries(state.cartState.items).forEach((x) => {
        n = n + x[1].quantity;
    });
    return n;
};

export const getCartValue = (state) => {
    const amount = Object.values(state.cartState.items).reduce(
        (a, b) => ({
            price: a.price + (b.price - (b.discount * b.price) / 100) * b.quantity,
        }),
        {
            price: 0,
            quantity: 0,
            discount: 0,
        }
    ).price;
    return amount;
}

export const { toggleCart, setCartItem, deleteCartItem, emptyCart } = cartSlice.actions;

export default cartSlice;

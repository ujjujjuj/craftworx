import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: 'cartState',
    initialState: {
        cart: {
            isExpanded: false,
            items: {},
        }
    },
    reducers: {
        toggleCart: (state, param) => {
            state.cart.isExpanded = !state.cart.isExpanded;
        },
        setCartItem: (state, params) => {
            let { product, amount } = params.payload;
            let quantity = (state.cart.items[product.id]?.quantity || 0) + amount;
            let newCart = Object.assign({}, state.cart);
            if (quantity === 0) {
                delete newCart.items[product.id];
                state.cart = newCart;
            } else {
                newCart.items[product.id] = { ...product, quantity };
                state.cart = newCart;
            }
            state.cart = newCart;
        },
        deleteCartItem: (state, params) => {
            let id = params.payload;
            let newCart = Object.assign({}, state.cart);
            delete newCart.items[id];
            state.cart = newCart;
        },
        emptyCart: (state, params) => {
            let newCart = Object.assign({}, state.cart);
            newCart.items = {}
            state.cart = newCart;
        }
    }
})

export const getCheckoutCart = (state)=>{
    let checkoutCart = {};
    Object.entries(state.cartState.cart.items).forEach(([productId, product]) => {
        checkoutCart[productId] = product.quantity;
    });
    return checkoutCart;
};

export const getCartSize = (state)=>{
    let n=0;
    Object.entries(state.cartState.cart.items).forEach((x)=>{
        n= n+x[1].quantity;
    })
    return n;
}

export const { toggleCart,setCartItem,deleteCartItem,emptyCart } = cartSlice.actions

export default cartSlice
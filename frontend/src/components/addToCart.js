import styles1 from "../styles/components/cart.module.css";
import styles from "../styles/components/home.module.css";

import { useEffect, useState } from "react";
import { useCart } from "../hooks/cart";

const AddToCart = ({ product }) => {
    const { cart, setCartItem } = useCart();
    const setCartItem2 = setCartItem.bind(this, product);

    return (
        <>
            {(cart.items[product.id]?.quantity || 0) > 0 ? (
                <div className={styles1.qtyWrap}>
                    <div
                        className={styles1.alter}
                        onClick={() => {
                            setCartItem2(1);
                        }}
                    >
                        <i className="fas fa-plus"></i>
                    </div>
                    <input
                        type="number"
                        min={1}
                        value={cart.items[product.id]?.quantity}
                        readOnly
                    ></input>
                    <div
                        className={styles1.alter}
                        onClick={() => {
                            setCartItem2(-1);
                        }}
                    >
                        <i className="fas fa-minus"></i>
                    </div>
                </div>
            ) : (
                <div
                    className={styles.addToCart}
                    onClick={() => {
                        setCartItem2(1);
                    }}
                >
                    <img src="/images/cart.svg" alt="" />
                    &nbsp;&nbsp; Add to cart
                </div>
            )}
        </>
    );
};

export default AddToCart;

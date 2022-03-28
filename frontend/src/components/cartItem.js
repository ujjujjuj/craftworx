import { useEffect, useState } from "react";
import { useCart } from "../hooks/cart";
import styles from "../styles/components/cart.module.css";

const CartItem = ({ product }) => {
    const { setCartItem, deleteCartItem, cart } = useCart();
    const setCartItem2 = setCartItem.bind(this, product);

    return (
        <>
            <div className={styles.cartItem}>
                <div className={styles.cartImg}></div>
                <div className={styles.itemDet}>
                    <p>{product.name}</p>
                    <small>₹{product.price}</small>
                    <div className={styles.qtyWrap}>
                        <div className={styles.alter} onClick={() => setCartItem2(1)}>
                            <i className="fas fa-plus"></i>
                        </div>
                        <input
                            type="number"
                            value={cart.items[product.id]?.quantity || 0}
                            readOnly
                        ></input>
                        <div className={styles.alter} onClick={() => setCartItem2(-1)}>
                            <i className="fas fa-minus"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.delete}>
                    <i className="far fa-trash-alt" onClick={() => deleteCartItem(product.id)}></i>
                </div>
            </div>
        </>
    );
};

export default CartItem;

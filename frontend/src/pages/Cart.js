import styles from "../styles/components/cart.module.css";
import classnames from "classnames";
import CartItem from "../components/cartItem";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, toggleCart } = useCart();
    const navigate = useNavigate();
    const [prices, setPrices] = useState({ amount: 0, tax: 0 });

    useEffect(() => {
        const amount = Object.values(cart.items).reduce(
            (a, b) => ({ price: a.price + b.price * b.quantity }),
            {
                price: 0,
                quantity: 0,
            }
        ).price;
        const tax = Math.round((amount * 18) / 100);
        setPrices({ amount, tax });
    }, [cart]);

    return (
        <>
            <div
                className={classnames(styles.modal, cart.isExpanded ? styles.visible : "")}
                onClick={toggleCart}
            ></div>
            <section className={classnames(styles.cart, cart.isExpanded ? styles.visible : "")}>
                <div className={styles.cartHeader}>
                    <div className={styles.left}>
                        <img src="/images/cart.svg" alt="" />
                        <p>Your Cart</p>
                        <small>{Object.keys(cart.items).length} items</small>
                    </div>
                    <div className={styles.right} onClick={toggleCart}>
                        <img src="/images/close.svg" alt="" />
                    </div>
                </div>
                <div className={styles.cartItemList}>
                    {Object.entries(cart.items).map(([productId, product]) => {
                        return <CartItem key={productId} product={product} />;
                    })}
                </div>
                <hr />
                <div className={styles.row}>
                    <p>Subtotal</p>
                    <p>₹{prices.amount}</p>
                </div>
                <div className={styles.row}>
                    <p>Tax</p>
                    <p>₹{prices.tax}</p>
                </div>
                <div className={styles.row}>
                    <p>Shipping (Calculated in checkout)</p>
                    <p>-</p>
                </div>
                <div className={classnames(styles.row, styles.total)}>
                    <p>Estimated Total</p>
                    <p>₹{prices.amount + prices.tax}</p>
                </div>
                <div
                    className={styles.checkout}
                    onClick={() => {
                        toggleCart();
                        navigate("/checkout");
                    }}
                >
                    Checkout
                </div>
            </section>
        </>
    );
};

export default Cart;

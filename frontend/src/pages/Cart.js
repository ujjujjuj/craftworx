import styles from "../styles/components/cart.module.css";
import classnames from "classnames";
import CartItem from "../components/cartItem";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
    const { cart, toggleCart, getCartSize } = useCart();
    const navigate = useNavigate();
    const [prices, setPrices] = useState({ amount: 0, tax: 0 });
    const location = useLocation();
    useEffect(() => {
        const amount = Object.values(cart.items).reduce(
            (a, b) => ({ price: a.price + Math.floor((b.price - (b.discount * b.price / 100))).toFixed(2) * b.quantity }),
            {
                price: 0,
                quantity: 0,
                discount: 0
            }
        ).price;
        const tax = Math.round((amount * 18) / 100);
        setPrices({ amount, tax });
    }, [cart]);

    return (
        <>
            <div
                className={classnames(styles.modal, cart.isExpanded && !location.pathname.includes("checkout") ? styles.visible : "")}
                onClick={toggleCart}
            ></div>
            <section className={classnames(styles.cart, cart.isExpanded ? styles.visible : "")}>
                <div className={styles.cartHeader}>
                    <div className={styles.left}>
                        <img src="/images/cart.svg" alt="" />
                        <p>Your Cart</p>
                        <small>{getCartSize()} items</small>
                    </div>
                    <div className={styles.right} onClick={toggleCart}>
                        <img src="/images/close.svg" alt="" />
                    </div>
                </div>
                <div className={styles.cartItemList}>
                    {getCartSize()?<></>:<><div className={styles.emptyCart} onClick={()=>{
                        toggleCart()
                        navigate('/shop')
                    }}>
                        <img src="/images/fl0.svg" alt="empty cart" />
                        <p>Your cart is empty.<br/>Go ahead and add some products!</p>
                        <div className={styles.checkout}>Shop Now</div>
                    </div></>}
                    {Object.entries(cart.items).map(([productId, product]) => {
                        return <CartItem key={productId} product={product} />;
                    })}
                </div>
                {getCartSize() ? <><hr />
                    <div className={styles.row}>
                        <p>Subtotal</p>
                        <p>₹{prices.amount.toFixed(2)}</p>
                    </div>
                    <div className={styles.row}>
                        <p>Tax</p>
                        <p>₹{prices.tax.toFixed(2)}</p>
                    </div>
                    <div className={styles.row}>
                        <p>Shipping (Calculated in checkout)</p>
                        <p>-</p>
                    </div>
                    <div className={classnames(styles.row, styles.total)}>
                        <p>Estimated Total</p>
                        <p>₹{(prices.amount + prices.tax).toFixed(2)}</p>
                    </div>
                    <div
                        title={getCartSize() ? "" : "Add products to cart first"}
                        className={classnames(styles.checkout, getCartSize() ? "" : styles.disabled)}
                        onClick={() => {
                            if (getCartSize()) {
                                toggleCart();
                                navigate("/checkout");
                            }
                        }}
                    >
                        Checkout
                    </div></> : <></>}
            </section>
        </>
    );
};

export default Cart;

import { useState } from "react";
import styles from "../styles/components/cart.module.css";
import CartItem from "./cartItem";
import classnames from "classnames";

export const MobileCheckoutCart = ({ shippingCost, prices, cartSize, cart, setCheckoutModalState }) => {

    const [dropState, setDropState] = useState(false);

    return (<>
        <section className={classnames(styles.mobCart, dropState ? styles.drop : "")}>
            <div className={styles.cartHeader}>
                <div className={styles.left}>
                    <img src="/images/cart.svg" alt="" />
                    <p>Your Cart</p>
                    <small>{cartSize} items</small>
                    <p>•&nbsp;&nbsp;₹ {shippingCost ? ((prices.amount + prices.tax) / 100 + shippingCost).toFixed(2) : ((prices.amount + prices.tax) / 100).toFixed(2)}</p>
                </div>
                <div className={styles.right} onClick={() => setDropState((x) => !x)}>
                    <img src="/images/drop.svg" className={dropState ? styles.rotate : ""} alt="" />
                </div>
            </div>
            <section className={classnames(styles.bottom)}>
                <div className={styles.cartItemList}>
                    {Object.entries(cart.items).map(([productId, product]) => {
                        return (
                            <CartItem
                                key={productId}
                                checkoutModalState={setCheckoutModalState}
                                product={product}
                            />
                        );
                    })}
                </div>
                <div className={styles.orderDet}>
                    <div className={styles.orderSmRow}>
                        <p>Subtotal</p>
                        <p>₹{(prices.amount / 100).toFixed(2)}</p>
                    </div>
                    <div className={styles.orderSmRow}>
                        <p>Tax (GST)</p>
                        <p>₹{(prices.tax / 100).toFixed(2)}</p>
                    </div>
                    {shippingCost > 0 ? <>
                        <div className={styles.orderSmRow}>
                            <p>Shipping</p>
                            <p>₹{shippingCost.toFixed(2)}</p>
                        </div>
                        <div className={`${styles.orderSmRow} ${styles.tot}`}>
                            <p>Total</p>
                            <p>₹{((prices.amount + prices.tax) / 100 + shippingCost).toFixed(2)}</p>
                        </div>
                    </> :
                        <>  <div className={styles.orderSmRow}>
                            <p>Shipping (to be calculated)</p>
                            <p>-</p>
                        </div>
                            <div className={`${styles.orderSmRow} ${styles.tot}`}>
                                <p>Estimated Total</p>
                                <p>₹{((prices.amount + prices.tax) / 100).toFixed(2)}</p>
                            </div></>
                    }
                </div>
            </section>
        </section>
    </>);
}
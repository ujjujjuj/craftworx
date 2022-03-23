import styles from '../styles/components/cart.module.css'
import classnames from "classnames";
import {useCart} from "../hooks/cart"
const Cart = () => {
    const {cart,toggleCart} = useCart();
    
    return <>
    <div className={classnames(styles.modal,cart.isExpanded?styles.visible:"")} onClick={toggleCart}></div>
    <section className={classnames(styles.cart,cart.isExpanded?styles.visible:"")}>
    <div className={styles.cartHeader}>
        <div className={styles.left}>
            <img src="/images/cart.svg" alt=""/>
            <p>Your Cart</p>
            <small>3 items</small>
        </div>
        <div className={styles.right} onClick={toggleCart}>
            <img src="/images/close.svg" alt=""/>
        </div>
    </div>
    <div className={styles.cartItemList}>
        <div className={styles.cartItem}>
            <div className={styles.cartImg}></div>
            <div className={styles.itemDet}>
                <p>Trousseau Packaging</p>
                <small>$430</small>
            </div>
        </div>
        <div className={styles.cartItem}>
            <div className={styles.cartImg}></div>
            <div className={styles.itemDet}>
                <p>Trousseau Packaging</p>
                <small>$430</small>
            </div>
        </div>
       
    </div>
    <hr/>
    <div className={styles.row}>
        <p>Subtotal</p>
        <p>$4200</p>
    </div>
    <div className={styles.row}>
        <p>Tax</p>
        <p>$4.43</p>
    </div>
    <div className={styles.row}>
        <p>Shipping (Calculated in checkout)</p>
        <p>-</p>
    </div>
    <div className={classnames(styles.row,styles.total)}>
        <p>Estimated Total</p>
        <p>$4204.43</p>
    </div>
    <div className={styles.checkout}>
        Checkout
    </div>
</section>
    </>;
};

export default Cart;

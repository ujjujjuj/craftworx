import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/cart";
import styles from "../styles/components/cart.module.css";

const CartItem = ({ product,checkoutModalState }) => {
    const { setCartItem, deleteCartItem, cart, toggleCart,getCartSize } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const setCartItem2 = setCartItem.bind(this, product);
    let productFinalAmt = Math.floor((product.price - (product.discount * product.price / 100))).toFixed(2)
    return (
        <>
            <div className={styles.cartItem}>
                <div className={styles.cartImg} onClick={
                    (e) => {
                        navigate(`/product/${product.id}`)
                        toggleCart()
                    }
                } style={{ backgroundImage: `url('${process.env.REACT_APP_SERVER_URL + product.images.data[0].attributes.url}')` }}></div>
                <div className={styles.itemDet}>
                    <p onClick={
                        (e) => {
                            navigate(`/product/${product.id}`)
                            toggleCart()
                        }
                    }>{product.name}</p>
                    <small>₹{productFinalAmt}</small>
                    <div className={styles.qtyWrap}>
                        <div className={styles.alter} onClick={() => 
                            {
                                if(location.pathname.includes("checkout") && getCartSize()===1){
                                    checkoutModalState(true)
                                }else
                                setCartItem2(-1)}}>
                            <i className="fas fa-minus"></i>
                        </div>
                        <input
                            type="number"
                            value={cart.items[product.id]?.quantity || 0}
                            readOnly
                        ></input>
                        <div className={styles.alter} onClick={() => setCartItem2(1)}>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.delete}>
                    <i className="far fa-trash-alt" onClick={() => { 
                        if(location.pathname.includes("checkout") && Object.keys(cart.items).length===1){
                            checkoutModalState(true)
                        }else
                        deleteCartItem(product.id)
                    }}></i>
                </div>
            </div>
        </>
    );
};

export default CartItem;

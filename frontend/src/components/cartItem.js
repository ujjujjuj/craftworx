import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/components/cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, getCartSize, setCartItem, toggleCart } from "../app/cartSlice";
import { useEffect } from "react";
import classNames from "classnames";
import useAnalyticsEventTracker from "../api/useAnalyticsEventTracker";
import { gtag } from "ga-gtag";

const CartItem = ({ product, checkoutModalState, isSm }) => {
    // const { setCartItem, deleteCartItem, cart, toggleCart,getCartSize } = useCart();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useSelector((state) => state.cartState);
    const cartSize = useSelector(getCartSize);
    const gaEventTracker = useAnalyticsEventTracker("Cart");
    let productFinalAmt = (product.price - ((product.discount ?? 0) * product.price) / 100);
    return (
        <>
            <div className={classNames(styles.cartItem, isSm ? styles.isSm : "")} >
                <div
                    className={styles.cartImg}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/product/${product.id}`);
                        !isSm && dispatch(toggleCart(false));
                    }}
                    style={{
                        backgroundImage: `url('${process.env.REACT_APP_SERVER_URL + (isSm ? product.images[0].url : product.images.data[0].attributes.url)
                            }')`,
                    }}
                ></div>
                <div className={styles.itemDet}>
                    <p
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/product/${product.id}`);
                            !isSm && dispatch(toggleCart(false));
                        }}
                    >
                        {product.name}
                    </p>
                    <small>₹{(productFinalAmt / 100).toFixed(2)}</small>
                    {isSm ? (
                        <div className={styles.smQty}>x{product.qty}</div>
                    ) : (
                        <div className={styles.qtyWrap}>
                            <div
                                className={styles.alter}
                                onClick={() => {
                                    if (location.pathname.includes("checkout") && cartSize === 1) {
                                        checkoutModalState(true);
                                    } else dispatch(setCartItem({ amount: -1, product }));
                                }}
                            >
                                <i className="fas fa-minus"></i>
                            </div>
                            <input type="number" value={cart.items[product.id]?.quantity || 0} readOnly></input>
                            <div className={styles.alter} onClick={() => dispatch(setCartItem({ amount: 1, product }))}>
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                    )}
                </div>
                {isSm ? (
                    <></>
                ) : (
                    <div className={styles.delete}>
                        <i
                            className="far fa-trash-alt"
                            onClick={() => {
                                gaEventTracker("Product Abandoned", `Name: ${product.name}; ID:${product.id}`)
                                gtag("event", "remove_from_cart")
                                gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
                                    fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        method: 'POST',
                                        body: JSON.stringify({
                                            client_id: clientId,
                                            events: [{
                                                "name": "remove_from_cart",
                                                "params": {
                                                    "currency": "INR",
                                                    "value": (product.price / 100) * product.quantity,
                                                    "items": [
                                                        {
                                                            "item_id": product.id,
                                                            "item_name": product.name,
                                                            "currency": "INR",
                                                            "discount": product.discount ?? 0,
                                                            "price": product.price / 100,
                                                            "quantity": product.quantity
                                                        }
                                                    ]
                                                }
                                            }]
                                        })
                                    })
                                });
                                if (location.pathname.includes("checkout") && Object.keys(cart.items).length === 1) {
                                    checkoutModalState(true);
                                } else dispatch(deleteCartItem(product.id));
                            }}
                        ></i>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartItem;

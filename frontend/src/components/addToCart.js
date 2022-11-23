import styles from "../styles/components/home.module.css";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItem } from "../app/cartSlice";
import useAnalyticsEventTracker from "../api/useAnalyticsEventTracker";
import { gtag } from "ga-gtag";
const AddToCart = ({ product, ctx, qty }) => {
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState("Add to cart");
    const gaEventTracker = useAnalyticsEventTracker("Add to Cart")
    useEffect(() => {
        if (btnText === "Added") {
            setTimeout(() => {
                setBtnText("Add to cart");
            }, 1000);
        }
    }, [btnText]);
    return (
        <>
            <div
                className={classnames(
                    styles.addToCart,
                    btnText === "Added" ? styles.added : "",
                    ctx === "pView" ? styles.pViewAdd : ""
                )}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!ctx) {
                        dispatch(setCartItem({ amount: 1, product }));
                    } else {
                        dispatch(setCartItem({ amount: qty, product }));
                    }
                    gaEventTracker("Added to cart", `Name: ${product.name}; ID: ${product.id}`)
                    setBtnText("Added");
                    gtag("event", "add_to_cart")
                    gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
                        fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                client_id: clientId,
                                events: [{
                                    "name": "add_to_cart",
                                    "params": {
                                        "currency": "INR",
                                        "value": (product.price / 100) * (ctx ? qty : 1),
                                        "items": [
                                            {
                                                "item_id": product.id,
                                                "item_name": product.name,
                                                "discount": product.discount ?? 0,
                                                "price": product.price / 100,
                                                "quantity": ctx ? qty : 1
                                            }
                                        ]
                                    }
                                }]
                            })
                        })
                    });
                }}
            >
                {btnText === "Added" ? <i className="fas fa-check"></i> : <img src="/images/cart.svg" alt="" />}
                &nbsp;&nbsp; {btnText}
            </div>
        </>
    );
};

export default AddToCart;

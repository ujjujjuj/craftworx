import styles from "../styles/components/home.module.css";
import classnames from "classnames";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCartItem } from "../app/cartSlice";

const AddToCart = ({ product, ctx, qty }) => {
    const dispatch = useDispatch();
    const [btnText, setBtnText] = useState("Add to cart");
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
                    setBtnText("Added");
                }}
            >
                {btnText === "Added" ? <i className="fas fa-check"></i> : <img src="/images/cart.svg" alt="" />}
                &nbsp;&nbsp; {btnText}
            </div>
        </>
    );
};

export default AddToCart;

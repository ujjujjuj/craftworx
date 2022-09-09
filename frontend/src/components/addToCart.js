import styles from "../styles/components/home.module.css";
import classnames from "classnames";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";

const AddToCart = ({ product, ctx, qty }) => {
    const { cart, setCartItem, deleteCartItem } = useCart();
    const setCartItem2 = setCartItem.bind(this, product);
    const [btnText,setBtnText] = useState('Add to cart')
    useEffect(()=>{
        if(btnText==='Added'){
            setTimeout(() => {
                setBtnText("Add to cart")
            }, 500);
        }
    },[btnText])
    return (
        <>
            <div className={classnames(styles.addToCart, btnText==='Added'  ? styles.added : "", (ctx === "pView") ? styles.pViewAdd : "")}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!ctx) {
                        setCartItem2(1)
                    }else{
                        setCartItem2(qty)
                    }
                    setBtnText("Added");
                }}
            >
                {btnText==='Added' ? <i className="fas fa-check"></i> :
                    <img src="/images/cart.svg" alt="" />}
                &nbsp;&nbsp; {btnText}
            </div>

        </>
    );
};

export default AddToCart;

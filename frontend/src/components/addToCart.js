import styles from "../styles/components/home.module.css";
import classnames from "classnames";
import { useCart } from "../hooks/cart";

const AddToCart = ({ product, ctx, qty }) => {
    const { cart, setCartItem, deleteCartItem } = useCart();
    const setCartItem2 = setCartItem.bind(this, product);
    
    return (
        <>
            <div className={classnames(styles.addToCart, (cart.items[product.id]?.quantity || 0) > 0 ? styles.added : "", (ctx === "pView") ? styles.pViewAdd : "")}
                onClick={(e) => {
                    e.stopPropagation();
                    if (!ctx) {
                        if ((cart.items[product.id]?.quantity || 0) <= 0)
                            setCartItem2(1);
                        else
                            deleteCartItem(product.id);
                    }else{
                        if((cart.items[product.id]?.quantity || 0) > 0)
                        {
                            deleteCartItem(product.id);
                        }
                        else
                        setCartItem2(qty)
                    }
                }}
            >
                {(cart.items[product.id]?.quantity || 0) > 0 ? <i className="fas fa-check"></i> :
                    <img src="/images/cart.svg" alt="" />}
                &nbsp;&nbsp; {(cart.items[product.id]?.quantity || 0) > 0 ? "Added" : "Add to cart"}
            </div>

        </>
    );
};

export default AddToCart;

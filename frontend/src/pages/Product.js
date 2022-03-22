import styles from "../styles/components/home.module.css";
import AddToCart from "../components/addToCart";

const Product = ({ name, price }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.prodImg}></div>
            <p>{name}</p>
            <small>₹{Math.round(price / 100)}</small>
            <AddToCart />
        </div>
    );
};

export default Product;

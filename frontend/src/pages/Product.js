import styles from "../styles/components/home.module.css";
import AddToCart from "../components/addToCart";

const Product = ({ product = { name: "Example Product", price: 42000 } }) => {
    return (
        <div className={styles.productCard}>
            <div className={styles.prodImg}></div>
            <p>{product.name}</p>
            <small>₹{product.price}</small>
            <AddToCart product={product} />
        </div>
    );
};

export default Product;

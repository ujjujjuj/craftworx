import styles from '../styles/components/home.module.css';
import AddToCart from '../components/addToCart'
const Product = () => {
    return <div className={styles.productCard}>
    <div className={styles.prodImg}></div>
    <p>
        Trousseau Packaging
    </p>
    <small>
        $420
    </small>
    <AddToCart/>
</div>;
};

export default Product;

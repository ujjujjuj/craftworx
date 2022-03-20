import styles from '../styles/components/home.module.css';
const AddToCart = ()=>{

    return (
        <div className={styles.addToCart}>
        <img src="/images/cart.svg" alt=""/>
       &nbsp;&nbsp; Add to cart
    </div>
    );
}

export default AddToCart;
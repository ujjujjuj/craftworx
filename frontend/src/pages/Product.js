import styles from "../styles/components/home.module.css";
import AddToCart from "../components/addToCart";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { gtag } from "ga-gtag";

const Product = ({ product = { name: "Example Product", price: 42000, images: { data: null }, discount: 0 }, shimmer = false }) => {
    const navigate = useNavigate();
    const openProduct = () => {
        gtag("event", "select_item")
        gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
            fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({
                    client_id: clientId,
                    events: [{
                        "name": "select_item",
                        "params": {
                            "items": [
                                {
                                    "item_id": product.id,
                                    "item_name": product.name,
                                    "discount": product.discount ?? 0,
                                    "price": product.price / 100
                                }
                            ]
                        }
                    }]
                })
            })
        });
        navigate(`/product/${product.id}`);
    }

    let productFinalAmt = (product.price - ((product.discount ?? 0) * product.price / 100)).toFixed(2)
    return (
        <div className={classNames(styles.productCard, (shimmer) ? styles.shimmer : "")} onClick={shimmer ? () => { } : openProduct}>
            <div className={styles.prodImg} style={shimmer ? {} : { backgroundImage: `url('${product.images.data ? process.env.REACT_APP_SERVER_URL + product.images.data[0].attributes.url : '../images/product-placeholder.png'}')` }}></div>
            <div className={styles.prodDetWrap}>
                <p className={styles.prodName}>{shimmer ? "" : product.name}</p>
                <small className={styles.prodPrice}>{shimmer ? "" : "₹ " + (productFinalAmt / 100).toFixed(2)}</small>
                {shimmer ? <></> : <div className={styles.spacer}></div>}
                {shimmer ? <div className={styles.shimmerAdd}></div> : <AddToCart product={product} />}
            </div>
        </div>
    );
};

export default Product;

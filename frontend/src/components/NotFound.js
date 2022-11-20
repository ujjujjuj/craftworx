import { useNavigate } from "react-router-dom";
import styles from "../styles/components/notfound.module.css"
export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.noOrders}>
            <img src="/images/fl0.svg" alt="empty cart" />
            <p>
                No results found :(
                <br />
                Try changing the category.
            </p>
            <div className={styles.btn} onClick={() => {
                navigate("/shop?q=")
            }}>Go Back</div>
        </div>
    );
};
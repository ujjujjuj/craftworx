import styles from "../styles/components/orderuser.module.css"
import CartItem from "./cartItem";
import classnames from "classnames"
import { useNavigate } from "react-router-dom";

export const OrderItem = ({ order }) => {


    const getInvoice = async (e) => {
        console.log(order)
        e.stopPropagation();
        let req = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/invoice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: order.order.shiprocketId
            }),
        });
        let res = await req.json()
        window.open(res.invoice, '_blank').focus();

    }

    const navigate = useNavigate();
    return (<>
        <div className={styles.orderItem} onClick={() => {
            navigate(`/order?id=${order.order.orderId}`)
        }}>
            <div className={styles.orderLeft}>
                <div className={styles.orderLi}>
                    <p>Order placed on</p>
                    <h3>{new Date(order.order.createdAt).toLocaleString("en", { year: "numeric", month: "long", day: "numeric" })}</h3>
                </div>
                <div className={styles.orderLi}>
                    <p>Total</p>
                    <h3>₹{(order.order.amount / 100).toFixed(2)}</h3>
                </div>
                <div className={styles.orderLi}>
                    <p>Status</p>
                    <h3>Placed</h3>
                </div>
                <div className={classnames(styles.orderLi, styles.invoice)}>
                    <div onClick={getInvoice}>
                        <i className="fa-regular fa-file-lines"></i> <p>View Invoice</p>
                    </div>
                </div>
            </div>
            <div className={styles.sep}></div>
            <div className={styles.orderRight}>
                {order.cart.map((x, n) => {
                    return <CartItem product={x} isSm={true} key={n} />
                })}
                <div className={styles.btns}>
                    <div className={styles.btn}>
                        Track Order
                    </div>
                    <div className={styles.btn}>
                        Leave Feedback
                    </div>
                </div>
            </div>
        </div>
    </>);
}
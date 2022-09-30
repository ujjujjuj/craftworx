import { useEffect } from "react"
import styles from "../styles/components/orderuser.module.css"
import { OrderItem } from "./OrderItem"
import { useSelector } from "react-redux";
import { useState } from "react";


export const Orders = () => {
    const user = useSelector((state) => state.authState);
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/getAll?email=${user.user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data)
            })
    }, [])

    return (<>
        <section className={styles.orderPager}>
            <h1>Your Orders</h1>
            <div className={styles.ordersWrap}>
                {
                    orders?.length ? orders.map((x, n) => {
                        return (
                            <OrderItem order={x} key={n} />
                        )
                    }) :
                        <div className={styles.noOrders}>
                            <img src="/images/fl0.svg" alt="empty cart" />
                            <p>
                                Your have no orders yet.
                                <br />
                                Go ahead and buy some products!
                            </p>
                            <div className={styles.btn}>Shop Now</div>
                        </div>
                }
            </div>
        </section>

    </>)
}
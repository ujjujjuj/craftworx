import { useEffect } from "react"
import styles from "../styles/components/orderuser.module.css"
import { OrderItem } from "./OrderItem"
import { useSelector } from "react-redux";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";


export const Orders = () => {
    const user = useSelector((state) => state.authState);
    const [orders, setOrders] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        if (user.user)
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
                        orders !== null ?
                            <div className={styles.noOrders}>
                                <img src="/images/fl0.svg" alt="empty cart" />
                                <p>
                                    Your have no orders yet.
                                    <br />
                                    Go ahead and buy some products!
                                </p>
                                <div className={styles.btn} onClick={() => {
                                    navigate("/shop")
                                }}>Shop Now</div>
                            </div> :
                            <div style={{ margin: "auto" }}>
                                <ThreeDots
                                    height="20"
                                    width="60"
                                    radius="9"
                                    color="#54605F"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            </div>
                }
            </div>
        </section>

    </>)
}
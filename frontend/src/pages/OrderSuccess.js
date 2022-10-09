import { useEffect, useState } from "react";
import styles from "../styles/components/ordersuccess.module.css";
import gsap, { Linear, Sine } from "gsap";
import CartItem from "../components/cartItem";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThreeDots } from "react-loader-spinner";

const OrderSuccess = () => {
    const [found, setFound] = useState(false);
    const { state } = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 });
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" });

        let i;
        let container = document.getElementById("container"),
            w = window.innerWidth,
            h = window.innerHeight;

        for (i = 0; i < 4; i++) {
            let Div = document.createElement("div");
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(0, w * 0.34), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            let Div = document.createElement("div");
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(0, w * 0.34), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 4; i++) {
            let Div = document.createElement("div");
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(w * 0.8, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            let Div = document.createElement("div");
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(w * 0.7, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        function animm(elm) {
            gsap.to(elm, R(10, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
            gsap.to(elm, R(4, 8), {
                x: "+=100",
                rotationZ: R(0, 180),
                repeat: -1,
                yoyo: true,
                ease: Sine.easeInOut,
            });
        }

        function R(min, max) {
            return min + Math.random() * (max - min);
        }
    };
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({});
    const [prices, setPrices] = useState({
        amount: 0,
        tax: 0,
        ship: 0,
        total: 0
    })

    useEffect(() => {
        if (state == null && searchParams.get("id") == null) {
            navigate('/shop')
        } else {
            window.scrollTo(0, 0);
            getOrderData(state?.id || searchParams.get("id"));
        }
    }, [state, searchParams]);

    const getOrderData = (id) => {
        if (id) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/get?id=${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (!(data?.error)) {
                        setProducts(data.cart)
                        setOrder(data.order)
                        let total = data.order.amount / 100
                        let ship = data.order.shipping / 100
                        let subWt = total - ship
                        let amount = (subWt / 1.18)
                        let tax = (amount * 0.18)
                        setPrices({
                            amount, tax, ship, total
                        })
                        init();
                    } else {
                        setFound(false)
                        setTimeout(() => {
                            navigate("/shop")
                        }, 2000);
                    }
                });
        }
    };

    useEffect(() => {
        console.log(products)
    }, [products])

    return (
        <>
            <Helmet>
                <title>Craftworx | Order</title>
            </Helmet>
            {
                products.length > 0 ?
                    <>
                        <div className={styles.container} id="container"></div>
                        <section className={styles.thanks}>
                            <img src="/images/fl0.svg" width={200} alt="Flower vector" />
                            <h1>Thank you</h1>
                        </section>
                        <section className={styles.orderDet}>
                            <div className={styles.orderHead}>
                                <p>Your order was recieved</p>
                                <a href="/shop">Back to shop</a>
                            </div>
                            <div className={styles.orderDetWrap}>
                                <div className={styles.orderItems}>
                                    {
                                        products.length && products.map((x, n) => <CartItem product={x} isSm={true} key={n} />)
                                    }
                                </div>
                                <div className={styles.orderSummary}>
                                    <div className={styles.orderSmRow}>
                                        <p>Subtotal</p>
                                        <p>₹{prices.amount.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.orderSmRow}>
                                        <p>Tax (GST)</p>
                                        <p>₹{prices.tax.toFixed(2)}</p>
                                    </div>
                                    <div className={styles.orderSmRow}>
                                        <p>Shipping</p>
                                        <p>₹{prices.ship.toFixed(2)}</p>
                                    </div>
                                    <div className={`${styles.orderSmRow} ${styles.tot}`}>
                                        <p>Total</p>
                                        <p>₹{prices.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.orderAdrWrp}>
                                <div className={styles.orderAdr}>
                                    <p>Your order is shipping here:</p>
                                    <div>
                                        {order.userInfo?.fName} {order.userInfo?.lName}
                                        <br />
                                        {order.userInfo?.address}
                                        <br />
                                        {order.userInfo?.city}, {order.userInfo?.state} - {order.userInfo?.zipcode}
                                        <br />
                                        {order.userInfo?.country}
                                    </div>
                                </div>
                                <div className={styles.trckOrd}>Track Order</div>
                            </div>
                        </section>
                    </> : <>
                        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                            {found ?
                                <>
                                    <ThreeDots
                                        height="15"
                                        width="60"
                                        radius="20"
                                        color="#54605F"
                                        ariaLabel="three-dots-loading"
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                    <p style={{ marginTop: "15px", fontSize: "17px" }}>Fetching your order...</p>
                                </> : <>
                                    <i class="fa-solid fa-triangle-exclamation" style={{ color: "#54605F", fontSize: "50px" }}></i>
                                    <p style={{ marginTop: "15px", fontSize: "19px", fontWeight: "500", color: "#54605F" }}>Order not found</p>
                                    <p style={{ marginTop: "7px", fontSize: "14px" }}>Redirecting to Shop...</p>
                                </>}
                        </section>
                    </>
            }
        </>
    );
};

export default OrderSuccess;

import { useEffect } from "react";
import styles from '../styles/components/ordersuccess.module.css'
import gsap, { Linear, Sine } from "gsap";
import CartItem from "../components/cartItem";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {

    const {state} = useLocation();
    const navigate = useNavigate();
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 });
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" });

        let i;
        let container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (i = 0; i < 4; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(0, w * 0.34), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(0, w * 0.34), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 4; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(w * 0.80, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(w * 0.70, w), y: R(-200, -150), z: R(-200, 200) });
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
    useEffect(() => {
        console.log(state)
        if(!state){
            navigate('/shop')
        }else{
            window.scrollTo(0, 0);
            getOrderData();
            init();
        }
    }, [state]);
    let sampleProduct = {
        "id": 7,
        "attributes": {
            "name": "Craftworx Wooden Gift Packaging Designer Square Empty Box (Blue Golden, 8 x 8 x 3 Inches)",
            "price": 899,
            "category": "Gifts",
            "discount": 50,
            "images": {
                "data": [
                    {
                        "id": 18,
                        "attributes": {
                            "name": "https://m.media-amazon.com/images/I/41FPgnJ2gdL.jpg",
                            "alternativeText": "https://m.media-amazon.com/images/I/41FPgnJ2gdL.jpg",
                            "caption": "https://m.media-amazon.com/images/I/41FPgnJ2gdL.jpg",
                            "width": 375,
                            "height": 500,
                            "formats": {
                                "thumbnail": {
                                    "name": "thumbnail_https://m.media-amazon.com/images/I/41FPgnJ2gdL.jpg",
                                    "hash": "thumbnail_41_F_Pgn_J2gd_L_352965838b",
                                    "ext": ".jpg",
                                    "mime": "image/jpeg",
                                    "path": null,
                                    "width": 117,
                                    "height": 156,
                                    "size": 2.34,
                                    "url": "/uploads/thumbnail_41_F_Pgn_J2gd_L_352965838b.jpg"
                                }
                            },
                            "hash": "41_F_Pgn_J2gd_L_352965838b",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 18.37,
                            "url": "/uploads/41_F_Pgn_J2gd_L_352965838b.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-05-31T15:08:31.925Z",
                            "updatedAt": "2022-05-31T15:08:31.925Z"
                        }
                    },
                    {
                        "id": 19,
                        "attributes": {
                            "name": "https://m.media-amazon.com/images/I/71NLdYDJxaS._SL1280_.jpg",
                            "alternativeText": "https://m.media-amazon.com/images/I/71NLdYDJxaS._SL1280_.jpg",
                            "caption": "https://m.media-amazon.com/images/I/71NLdYDJxaS._SL1280_.jpg",
                            "width": 960,
                            "height": 1280,
                            "formats": {
                                "thumbnail": {
                                    "name": "thumbnail_https://m.media-amazon.com/images/I/71NLdYDJxaS._SL1280_.jpg",
                                    "hash": "thumbnail_71_N_Ld_YD_Jxa_S_SL_1280_c2206dbf64",
                                    "ext": ".jpg",
                                    "mime": "image/jpeg",
                                    "path": null,
                                    "width": 117,
                                    "height": 156,
                                    "size": 3.39,
                                    "url": "/uploads/thumbnail_71_N_Ld_YD_Jxa_S_SL_1280_c2206dbf64.jpg"
                                }
                            },
                            "hash": "71_N_Ld_YD_Jxa_S_SL_1280_c2206dbf64",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 154.45,
                            "url": "/uploads/71_N_Ld_YD_Jxa_S_SL_1280_c2206dbf64.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-05-31T15:10:15.354Z",
                            "updatedAt": "2022-05-31T15:10:15.354Z"
                        }
                    },
                    {
                        "id": 20,
                        "attributes": {
                            "name": "https://m.media-amazon.com/images/I/71shbuqi1BS._SL1280_.jpg",
                            "alternativeText": "https://m.media-amazon.com/images/I/71shbuqi1BS._SL1280_.jpg",
                            "caption": "https://m.media-amazon.com/images/I/71shbuqi1BS._SL1280_.jpg",
                            "width": 960,
                            "height": 1280,
                            "formats": {
                                "thumbnail": {
                                    "name": "thumbnail_https://m.media-amazon.com/images/I/71shbuqi1BS._SL1280_.jpg",
                                    "hash": "thumbnail_71shbuqi1_BS_SL_1280_260fd1cae4",
                                    "ext": ".jpg",
                                    "mime": "image/jpeg",
                                    "path": null,
                                    "width": 117,
                                    "height": 156,
                                    "size": 3.46,
                                    "url": "/uploads/thumbnail_71shbuqi1_BS_SL_1280_260fd1cae4.jpg"
                                }
                            },
                            "hash": "71shbuqi1_BS_SL_1280_260fd1cae4",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 139.51,
                            "url": "/uploads/71shbuqi1_BS_SL_1280_260fd1cae4.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-05-31T15:10:21.492Z",
                            "updatedAt": "2022-05-31T15:10:21.492Z"
                        }
                    },
                    {
                        "id": 17,
                        "attributes": {
                            "name": "https://m.media-amazon.com/images/I/71v4rRC5FhS._SL1280_.jpg",
                            "alternativeText": "https://m.media-amazon.com/images/I/71v4rRC5FhS._SL1280_.jpg",
                            "caption": "https://m.media-amazon.com/images/I/71v4rRC5FhS._SL1280_.jpg",
                            "width": 960,
                            "height": 1280,
                            "formats": {
                                "thumbnail": {
                                    "name": "thumbnail_https://m.media-amazon.com/images/I/71v4rRC5FhS._SL1280_.jpg",
                                    "hash": "thumbnail_71v4r_RC_5_Fh_S_SL_1280_5714603ef2",
                                    "ext": ".jpg",
                                    "mime": "image/jpeg",
                                    "path": null,
                                    "width": 117,
                                    "height": 156,
                                    "size": 3.48,
                                    "url": "/uploads/thumbnail_71v4r_RC_5_Fh_S_SL_1280_5714603ef2.jpg"
                                }
                            },
                            "hash": "71v4r_RC_5_Fh_S_SL_1280_5714603ef2",
                            "ext": ".jpg",
                            "mime": "image/jpeg",
                            "size": 145.33,
                            "url": "/uploads/71v4r_RC_5_Fh_S_SL_1280_5714603ef2.jpg",
                            "previewUrl": null,
                            "provider": "local",
                            "provider_metadata": null,
                            "createdAt": "2022-05-31T15:05:12.506Z",
                            "updatedAt": "2022-05-31T15:05:12.506Z"
                        }
                    }
                ]
            }
        }
    }

    const getOrderData = ()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders?filters[orderId][$eq]=${state.id}`)
        .then((res) => res.json()).then((data)=>(console.log(data)))
    }

    return (
        <>
            <div className={styles.container} id="container"></div>
            <section className={styles.thanks}>
                <img src='/images/fl0.svg' width={200} alt="Flower vector" />
                <h1>
                    Thank you
                </h1>
            </section>
            <section className={styles.orderDet}>
                <div className={styles.orderHead}>
                    <p>Your order was recieved</p>
                    <a href="/shop">Back to shop</a>
                </div>
                <div className={styles.orderDetWrap}>
                    <div className={styles.orderItems}>
                        <CartItem product={({id: sampleProduct.id,...sampleProduct.attributes})} isSm={true} />
                        <CartItem product={({id: sampleProduct.id,...sampleProduct.attributes})} isSm={true} />
                        <CartItem product={({id: sampleProduct.id,...sampleProduct.attributes})} isSm={true} />
                    </div>
                    <div className={styles.orderSummary}>
                        <div className={styles.orderSmRow}>
                            <p>Subtotal</p>
                            <p>₹450.00</p>
                        </div>
                        <div className={styles.orderSmRow}>
                        <p>Tax (GST)</p>
                            <p>₹50.00</p>
                        </div>
                        <div className={styles.orderSmRow}>
                        <p>Shipping</p>
                            <p>₹100.00</p>
                        </div>
                        <div className={`${styles.orderSmRow} ${styles.tot}`}>
                        <p>Total</p>
                            <p>₹690.00</p>
                        </div>
                    </div>
                </div>
                <div className={styles.orderAdrWrp}>
                    <div className={styles.orderAdr}>
                        <p>Your order is shipping here:</p>
                        <div>
                            <p>Ishaan Das</p>
                            <p>401 1st Ave</p>
                            <p>Apt 1</p>
                            <p>Manhattan, NY 111217</p>
                        </div>
                    </div>
                    <div className={styles.trckOrd}>
                        Track Order
                    </div>
                </div>

            </section>
        </>
    );
}

export default OrderSuccess;
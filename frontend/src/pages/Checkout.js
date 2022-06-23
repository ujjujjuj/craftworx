import { useEffect, useState } from "react";
import { useCart } from "../hooks/cart";
import styles1 from '../styles/components/checkout.module.css'
import styles from '../styles/components/cart.module.css'
import { Link, useNavigate } from "react-router-dom";
import classnames from 'classnames'
import CartItem from "../components/cartItem";
import { useAuth } from "../hooks/auth";
import Countries from "../components/countries";
import States from "../components/states";
import countriesJson from '../utils/countries.json'

const Checkout = () => {
    let authTokenShipRocket;
    const { getCheckoutCart } = useCart();
    const { user } = useAuth();
    const [states, setStates] = useState([])
    const [shippingCost, setShippingCost] = useState(0);
    const [shippingOptions, setShipOptions] = useState({
        currentSelected: -1,
        data: []
    });
    const [userPayInfo, setUserPayInfo] = useState({
        country: "",
        state: "",
        city: "",
        zipcode: "",
        fName: "",
        lName: "",
        address: "",
        phnNo: "",
        email: ""
    })
    const [processState, setProcessState] = useState('');
    const [checkoutModalState, setCheckoutModalState] = useState(false);
    const createOrder = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user"))?.jwt
            }`,
          },
          body: JSON.stringify({
            info: {
              name: "Ujjwal Dimri",
              email: "ujjwaldimri123@gmail.com",
              address: "user address user address user address user address",
            },
            cart: getCheckoutCart(),
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const options = {
              key: process.env.REACT_APP_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
              amount: "30000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: "Craftworx",
              description: "Craftworx transaction",
              order_id: data.id,
              handler: (response) => {
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/confirm`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
              });
              alert("success!");
            },
            prefill: {
              name: "Ujjwal Dimri",
              email: "ujjwaldimri123@gmail.com",
              contact: "9599580229",
            },
            notes: {
              address: "Gurgaon",
            },
            theme: {
              color: "#000000",
            },
          };
          const razorpay = new window.Razorpay(options);
          razorpay.on("payment.failed", (response) => {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
          razorpay.open();
        });
    };

    const { cart, getCartSize, emptyCart } = useCart();
    const [prices, setPrices] = useState({ amount: 0, tax: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const amount = Object.values(cart.items).reduce(
            (a, b) => ({ price: a.price + Math.floor((b.price - (b.discount * b.price / 100))).toFixed(2) * b.quantity }),
            {
                price: 0,
                quantity: 0,
                discount: 0
            }
        ).price;
        const tax = Math.round((amount * 18) / 100);
        setPrices({ amount, tax });
    }, [cart]);


    useEffect(() => {
        setProcessState(user.isLoggedIn ? "auth" : "initUnAuth")
    }, []);

    const initShipRocket = async (callback) => {
        if (authTokenShipRocket) {
            callback(authTokenShipRocket)
            return
        }
        let res = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": "durejanaman29@gmail.com",
                "password": "abcd@1234_"
            })
        })
        let result = await res.json()
        authTokenShipRocket = result.token
        callback(result.token)
    };

    const getShipOptions = async (token, callback) => {
        console.log("getting couriers")

        let params = {
            pickup_postcode: "282005",
            delivery_postcode: userPayInfo.zipcode,
            cod: 0,
            weight: Object.entries(cart.items)[0][1].weight
        }
        let res = await fetch('https://apiv2.shiprocket.in/v1/external/courier/serviceability?' + new URLSearchParams(params), {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        let result = await res.json()

        callback(result)
    }

    const selectShipElement = (e, rate, index) => {
        setShipOptions((shipOptions) => ({ ...shipOptions, currentSelected: index }))
        setShippingCost(Math.floor(rate))
    }

    const startShipProcess = () => {
        setUserPayInfo((userPayInfo) => ({ ...userPayInfo, state: document.getElementById('state').value, country: countriesJson.data[document.getElementById('country').value].name }))
        document.querySelector(`.${styles1.addressFormWrap}`).classList.add(styles1.hide);
        document.querySelector(`.${styles1.shippingTo}`).classList.remove(styles1.hide);
        document.querySelector(`.${styles1.shipPartner}`).classList.remove(styles1.hide);
        let [interval, loadElem] = loadShipStatus()
        loadElem.classList.remove(styles1.error)
        initShipRocket((token) => {
            getShipOptions(token, (res) => {
                clearInterval(interval)
                if (res.data) {
                    loadElem.classList.add(styles1.hidden)
                    setShipOptions((shipOptions) => ({ ...shipOptions, data: res.data.available_courier_companies }))
                } else {
                    loadElem.classList.add(styles1.error)
                    if (res.status_code === 422)
                        loadElem.innerHTML = (res.errors.delivery_postcode.slice(res.errors.delivery_postcode.length - 1) === '.' ? res.errors.delivery_postcode : res.errors.delivery_postcode + ".") + " Please try a different pincode."
                    else
                        loadElem.innerHTML = res.message + " Please try a different pincode."
                }
            })
        })
    }

    const loadShipStatus = () => {
        let n = 0;
        let elem = document.querySelector("." + styles1.shipLoadStatus)
        elem.classList.remove(styles1.hidden)
        elem.innerHTML = "Getting Shipping Options"
        let loadInterval = setInterval(() => {
            if (n < 3) {
                elem.innerHTML += '.'
                n++
            } else {
                elem.innerHTML = elem.innerHTML.slice(0, elem.innerHTML.length - 3)
                n = 0
            }
        }, 400);
        return [loadInterval, elem]
    }


    return (
        <>
            <section className={styles1.main}>
                {checkoutModalState ? <div className={classnames(styles.modal, styles.visible)}></div> : <></>}
                <section className={styles1.leftSec}>
                    {checkoutModalState ? <div className={classnames(styles1.popup)}>
                        <p>Are you sure you want to<br />empty your cart?</p>
                        <div className={styles1.buttonWrap}>
                            <div className={styles1.button} onClick={() => {
                                emptyCart()
                                setCheckoutModalState(false)
                                navigate('/shop')
                            }}>Empty Cart</div>
                            <div className={classnames(styles1.popupAlt)} onClick={() => {
                                setCheckoutModalState(false)
                            }}>Cancel</div>
                        </div>
                    </div> : <></>}
                    <div className={styles1.head}>
                        <p>Checkout</p>
                        <Link to='/shop'>Back to shop</Link>
                    </div>
                    {processState === 'initUnAuth' ? <div className={styles1.authWrap} >
                        <div className={styles1.button} onClick={() => {
                            navigate("/login");
                        }}>Login</div>
                        <p>or</p>
                        <div className={classnames(styles1.button, styles1.buttonAlt)} onClick={() => {
                            setProcessState('unAuth')
                        }}>Continue as guest</div>
                    </div> : <></>}
                    {processState === 'unAuth' ? <p className={styles1.contAsGuest}>Continuing as guest. <Link to='/login'>Login</Link></p> : <></>}
                    {processState === 'unAuth' || processState === 'auth' ? <><div className={styles1.addressFormWrap}>
                        <h3>Where & who to ship to?</h3>
                        <form className={styles1.addressForm} id="address-form" name="address-form" onSubmit={(e) => {
                            e.preventDefault()
                            startShipProcess()
                        }}>
                            <div className={styles1.selectWrap}> <Countries states={setStates} /></div>
                            <div className={styles1.halfInputForm}>
                                <div className={styles1.selectWrap}> <States states={states} /> </div>
                                <input type={"text"} placeholder={"City"} value={userPayInfo.city} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, city: e.target.value }))} name="city" id="city" required />
                            </div>
                            <div className={styles1.halfInputForm}>
                                <input type={"text"} placeholder={"Address"} value={userPayInfo.address} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, address: e.target.value }))} name="address" id="address" required />
                                <input type={"number"} placeholder={"Zip Code"} value={userPayInfo.zipcode} onChange={(e) => setUserPayInfo((zipcode) => ({ ...userPayInfo, zipcode: e.target.value }))} name="pincode" id="pincode" required />
                            </div>
                            <div className={styles1.halfInputForm}>
                                <input type={"text"} placeholder={"First Name"} value={userPayInfo.fName} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, fName: e.target.value }))} name="fname" id="fname" required />
                                <input type={"text"} placeholder={"Last Name"} value={userPayInfo.lName} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, lName: e.target.value }))} name="lname" id="lname" required />
                            </div>
                            <input type={"tel"} placeholder={"Phone Number"} value={userPayInfo.phnNo} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, phnNo: e.target.value }))} name="phone" id="phone" required />
                            <input type={"email"} placeholder={"Email"} value={userPayInfo.email} onChange={(e) => setUserPayInfo((userPayInfo) => ({ ...userPayInfo, email: e.target.value }))} name="email" id="email" required />
                        </form>
                        <div className={styles1.endForm}>
                            <p>Go Back</p>
                            <button className={styles1.button} type="submit" form="address-form">Continue</button>
                        </div>
                    </div>
                        <div className={classnames(styles1.shippingTo, styles1.hide)}>
                            <h3>Shipping to</h3>
                            <div className={styles1.flex}>
                                <p id="user-address">
                                    {userPayInfo.fName} {userPayInfo.lName}<br />
                                    {userPayInfo.address}<br />
                                    {userPayInfo.city}, {userPayInfo.state} - {userPayInfo.zipcode}<br />
                                    {userPayInfo.country}
                                </p>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <img src="/images/edit_icon.svg" alt="edit icon" />
                                    <p style={{ color: "#54605F", textDecoration: "underline", marginLeft: 8, fontWeight: "500", cursor: "pointer" }} onClick={() => {
                                        setShipOptions({
                                            currentSelected: -1,
                                            data: []
                                        })
                                        setShippingCost(0)
                                        document.querySelector("." + styles1.shipLoadStatus).classList.add(styles1.hidden)
                                        document.querySelector(`.${styles1.addressFormWrap}`).classList.remove(styles1.hide);
                                        document.querySelector(`.${styles1.shippingTo}`).classList.add(styles1.hide);
                                    }}>Edit</p>
                                </div>
                            </div>
                        </div>

                        <div className={classnames(styles1.shipPartner, styles1.hide)}>
                            <h3 className={classnames(styles1.shipLoadStatus, styles1.hidden)}>Getting Shipping Options</h3>
                            {shippingOptions.data.length ?
                                <>
                                    <h3>Select Shipping Option</h3>
                                    <div className={classnames(styles1.shipOptionsWrap)}>
                                        {shippingOptions.data.map((elem, n) => {
                                            return <>
                                                <div onClick={(e) => {
                                                    selectShipElement(e, elem.rate, n)
                                                }} className={classnames(styles1.shipOption, n === shippingOptions.currentSelected && styles1.selected)} key={n}>
                                                    <label htmlFor={"ship-" + n} key={n}>{elem.courier_name} : ₹ {Math.floor(elem.rate).toFixed(2)}<br /><small>( Estimated shipping in {elem.estimated_delivery_days}-{parseInt(elem.estimated_delivery_days) + 2} days )</small></label>
                                                </div>
                                            </>
                                        })}

                                    </div>
                                </> : <></>}
                        </div>

                    </> : <></>}

                </section>
                <section className={styles1.rightSec}>
                    <section className={classnames(styles.cart, styles.checkoutCart)}>
                        <div className={styles.cartHeader}>
                            <div className={styles.left}>
                                <img src="/images/cart.svg" alt="" />
                                <p>Your Cart</p>
                                <small>{getCartSize()} items</small>
                            </div>
                        </div>
                        <div className={styles.cartItemList}>
                            {Object.entries(cart.items).map(([productId, product]) => {
                                return <CartItem key={productId} checkoutModalState={setCheckoutModalState} product={product} />;
                            })}
                        </div>
                        <hr />
                        <div className={styles.row}>
                            <p>Subtotal</p>
                            <p>₹{prices.amount.toFixed(2)}</p>
                        </div>
                        <div className={styles.row}>
                            <p>Tax</p>
                            <p>₹{prices.tax.toFixed(2)}</p>
                        </div>
                        {shippingCost > 0 ?
                            <><div className={styles.row}>
                                <p>Shipping</p>
                                <p>₹{shippingCost.toFixed(2)}</p>
                            </div>
                                <div className={classnames(styles.row, styles.total)}>
                                    <p>Total</p>
                                    <p>₹{(prices.amount + prices.tax + shippingCost).toFixed(2)}</p>
                                </div>
                            </> : <><div className={styles.row}>
                                <p>Shipping (to be calculated)</p>
                                <p>-</p>
                            </div>
                                <div className={classnames(styles.row, styles.total)}>
                                    <p>Estimated Total</p>
                                    <p>₹{(prices.amount + prices.tax).toFixed(2)}</p>
                                </div>

                            </>
                        }
                        <div
                            title={"Place Order"}
                            className={classnames(styles.checkout, shippingCost > 0 ? "" : styles.disabled)}
                            onClick={createOrder}
                        >
                            Place Order
                        </div>
                    </section>
                </section>
            </section>

        </>
    );
};

export default Checkout;

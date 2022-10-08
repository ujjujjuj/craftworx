import { useEffect, useRef, useState } from "react";
import styles1 from "../styles/components/checkout.module.css";
import styles from "../styles/components/cart.module.css";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import CartItem from "../components/cartItem";
import Popup from "../components/popup";
import { getCartSize, getCheckoutCart, emptyCart } from "../app/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder, initRazorPay, confirmOrder } from "../api/checkout";
import CheckoutForm from "../components/checkoutForm";
import ShipOption from "../components/shipOption";
import { SavedAddress } from "../components/SavedAddress";
import { updateAddr } from "../app/authSlice";
import updateUserDb from "../api/update";

const Checkout = () => {
    const cart = useSelector((state) => state.cartState);
    const user = useSelector((state) => state.authState);
    const cartSize = useSelector(getCartSize);
    const dispatch = useDispatch();
    const checkoutCart = useSelector(getCheckoutCart);
    const refresh = useRef(0);
    const [states, setStates] = useState([]);
    const [shippingCost, setShippingCost] = useState(0);
    const [shippingOptions, setShipOptions] = useState({
        currentSelected: -1,
        data: [],
    });
    const [placeText, setPlaceText] = useState("Place Order");
    const [userPayInfo, setUserPayInfo] = useState({
        country: "",
        state: "",
        city: "",
        zipcode: "",
        fName: "",
        lName: "",
        address: "",
        phnNo: "",
        email: "",
    });
    const [processState, setProcessState] = useState("");
    const [checkoutModalState, setCheckoutModalState] = useState(false);
    const [transactionModal, setTransactionModal] = useState({
        visible: false,
        message: "",
        label: "",
    });


    const successCallback = async (resp, order) => {
        setTransactionModal({
            visible: true,
            message: "Please wait while we place your order",
            label: "Transaction Successful",
        });
        let confirm = await confirmOrder(resp);
        if (!confirm.error) {
            dispatch(emptyCart());
            if (user?.user?.isLoggedIn) {
                navigate("/success", {
                    state: {
                        id: order.id,
                    },
                    replace: true,
                });
            } else {
                navigate(`/order?id=${order.id}`, {
                    replace: true
                })
            }
        } else {
            setTransactionModal({
                visible: true,
                message: "If any money has been deducted, kindly reach out to us.",
                label: "Couldn't place your order",
            });
        }
    };

    const dismissCallback = () => {
        setPlaceText("Place Order");
    };

    const failureCallback = (response) => {
        setTransactionModal({
            visible: true,
            message: response.error.description,
            label: "Transaction Failed",
        });
    };

    const createOrder = async () => {
        setPlaceText("Processing..");
        let order = await fetchOrder(user, userPayInfo, checkoutCart, shippingOptions);
        if (order) {
            initRazorPay(order, userPayInfo, successCallback, dismissCallback, failureCallback);
        } else {
            setTransactionModal({
                visible: true,
                message: "Unable to process your request at the moment",
                label: "Transaction Failed",
            });
        }
    };

    const [prices, setPrices] = useState({ amount: 0, tax: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        if (Object.entries(cart.items).length === 0 && processState === "") {
            navigate("/shop");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    useEffect(() => {
        const amount = Object.values(cart.items).reduce(
            (a, b) => ({
                price: a.price + (b.price - (b.discount * b.price) / 100) * b.quantity,
            }),
            {
                price: 0,
                quantity: 0,
                discount: 0,
            }
        ).price;
        const tax = ((amount * 18) / 100);
        setPrices({ amount, tax });
    }, [cart]);

    useEffect(() => {
        setProcessState(user.isLoggedIn ? "auth" : "initUnAuth");
        let address = sessionStorage.getItem("userInfo");
        if (address) {
            setUserPayInfo(JSON.parse(address));
        }
    }, [user.isLoggedIn]);

    useEffect(() => {
        if (refresh.current > 0) {
            sessionStorage.setItem("userInfo", JSON.stringify(userPayInfo));
        }
        refresh.current++;
    }, [userPayInfo, refresh]);

    const selectShipElement = (e, rate, index) => {
        setShipOptions((shipOptions) => ({
            ...shipOptions,
            currentSelected: index,
        }));
        setShippingCost(Math.ceil(rate));
    };

    const startShipProcess = () => {
        if (processState === "auth") {
            setProcessState("authWA")
        }
        document.querySelector(`.${styles1.addressFormWrap}`).classList.add(styles1.hide);
        document.querySelector(`.${styles1.shippingTo}`).classList.remove(styles1.hide);
        document.querySelector(`.${styles1.shipPartner}`).classList.remove(styles1.hide);
        let { email, phnNo, ...addressInfo } = userPayInfo;
        if (!user?.user?.address?.data?.find((elem) => elem.fName === addressInfo.fName && elem.lName === addressInfo.lName) && user?.user?.isLoggedIn) {
            let prevAddrs = structuredClone(user.user.address)
            if (!prevAddrs || !prevAddrs.data)
                prevAddrs = {
                    data: []
                }
            prevAddrs.data = [...prevAddrs.data, addressInfo]
            dispatch(updateAddr(prevAddrs))
            updateUserDb({ address: prevAddrs }, user.jwt, user.user.id)
        }
        let [interval, loadElem] = loadShipStatus();
        loadElem.classList.remove(styles1.error);
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/getShipOptions`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                delivery_postcode: userPayInfo.zipcode,
                weight: Object.values(cart.items).reduce((prev, next) => prev + next.weight * next.quantity, 0),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                clearInterval(interval);
                if (!data.error && ![404, 422].includes(data.status)) {
                    loadElem.classList.add(styles1.hidden);
                    setShipOptions((shipOptions) => ({
                        ...shipOptions,
                        data: data.data.available_courier_companies,
                    }));
                } else {
                    loadElem.classList.add(styles1.error);
                    loadElem.innerText = data.message;
                }
            });
    };

    const loadShipStatus = () => {
        let n = 0;
        let elem = document.querySelector("." + styles1.shipLoadStatus);
        elem.classList.remove(styles1.hidden);
        elem.innerHTML = "Getting Shipping Options";
        let loadInterval = setInterval(() => {
            if (n < 3) {
                elem.innerHTML += ".";
                n++;
            } else {
                elem.innerHTML = elem.innerHTML.slice(0, elem.innerHTML.length - 3);
                n = 0;
            }
        }, 400);
        return [loadInterval, elem];
    };

    const emptyCartHandler = () => {
        dispatch(emptyCart());
        setCheckoutModalState(false);
        navigate("/shop");
    };

    const emptyForm = () => {
        setUserPayInfo({
            country: "",
            state: "",
            city: "",
            zipcode: "",
            fName: "",
            lName: "",
            address: "",
            phnNo: "",
            email: "",
        });
    };

    const updateStateLoc = (state) => {
        setStates(state);
    }


    return (
        <>
            <section className={styles1.main}>
                {checkoutModalState ? (
                    <Popup
                        line="Are you sure you want to empty your cart?"
                        posHandler={emptyCartHandler}
                        posLabel="Empty Cart"
                        negLabel="Cancel"
                        negHandler={() => {
                            setCheckoutModalState(false);
                        }}
                    />
                ) : (
                    <></>
                )}
                {transactionModal.visible ? (
                    <Popup
                        line={transactionModal.label}
                        sub_line={transactionModal.message}
                        posHandler={() => {
                            setTransactionModal(false);
                            setPlaceText("Place Order");
                        }}
                        posLabel="Retry"
                        negLabel="Cancel"
                        negHandler={() => {
                            navigate("/shop");
                        }}
                    />
                ) : (
                    <></>
                )}
                <section className={styles1.leftSec}>
                    <div className={styles1.head}>
                        <p>Checkout</p>
                        <Link to="/shop">Back to shop</Link>
                    </div>
                    {processState === "initUnAuth" ? (
                        <div className={styles1.authWrap}>
                            <div
                                className={styles1.button}
                                onClick={() => {
                                    navigate("/login", {
                                        state: {
                                            fromCheckout: true,
                                        },
                                    });
                                }}
                            >
                                Login
                            </div>
                            <p>or</p>
                            <div
                                className={classnames(styles1.button, styles1.buttonAlt)}
                                onClick={() => {
                                    setProcessState("unAuth");
                                }}
                            >
                                Continue as guest
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {processState === "unAuth" ? (
                        <p className={styles1.contAsGuest}>
                            Continuing as guest. <Link to="/login">Login</Link>
                        </p>
                    ) : (
                        <></>
                    )}
                    {(processState !== "initUnAuth") ? (
                        <>
                            {(processState === "auth" && user.user?.address?.data?.length) ?
                                <SavedAddress setState={setProcessState} setAddr={setUserPayInfo} />
                                : <></>}
                            {(processState === "unAuth" || processState === "authWA" || !(user.user?.address?.data?.length)) ?
                                <div className={styles1.addressFormWrap}>
                                    <h3>Where &amp; who to ship to?
                                        {processState === "authWA" ?
                                            <span onClick={() => { setProcessState("auth"); }}>Go Back</span> : <></>}
                                    </h3>
                                    <CheckoutForm startShipProcess={startShipProcess} setStates={updateStateLoc} userPayInfo={userPayInfo} setUserPayInfo={setUserPayInfo} states={states}>
                                    </CheckoutForm>
                                    <div className={styles1.endForm}>
                                        <p onClick={emptyForm}>Clear</p>
                                        <button className={styles1.button} type="submit" form="address-form">
                                            Continue
                                        </button>
                                    </div>
                                </div>
                                : <></>}
                            <div className={classnames(styles1.shippingTo, styles1.hide)}>
                                <h3>Shipping to</h3>
                                <div className={styles1.flex}>
                                    <p id="user-address">
                                        {userPayInfo.fName} {userPayInfo.lName}
                                        <br />
                                        {userPayInfo.address}
                                        <br />
                                        {userPayInfo.city}, {userPayInfo.state} - {userPayInfo.zipcode}
                                        <br />
                                        {userPayInfo.country}
                                    </p>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }} >
                                        <img src="/images/edit_icon.svg" alt="edit icon" />
                                        <p style={{
                                            color: "#54605F",
                                            textDecoration: "underline",
                                            marginLeft: 8,
                                            fontWeight: "500",
                                            cursor: "pointer",
                                        }}
                                            onClick={() => {
                                                setShipOptions({
                                                    currentSelected: -1,
                                                    data: [],
                                                });
                                                setShippingCost(0);
                                                document
                                                    .querySelector(`.${styles1.shipLoadStatus}`)
                                                    .classList.add(styles1.hidden);
                                                document
                                                    .querySelector(`.${styles1.addressFormWrap}`)
                                                    .classList.remove(styles1.hide);
                                                document
                                                    .querySelector(`.${styles1.shippingTo}`)
                                                    .classList.add(styles1.hide);
                                            }}
                                        >
                                            Edit
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={classnames(styles1.shipPartner, styles1.hide)}>
                                <h3 className={classnames(styles1.shipLoadStatus, styles1.hidden)}>
                                    Getting Shipping Options
                                </h3>
                                {shippingOptions.data.length ? (
                                    <>
                                        <h3>Select Shipping Option</h3>
                                        <div className={classnames(styles1.shipOptionsWrap)}>
                                            {shippingOptions.data.map((elem, n) => {
                                                return (
                                                    <ShipOption
                                                        key={n}
                                                        index={n}
                                                        ship={elem}
                                                        selectShipElement={selectShipElement}
                                                        shippingOptions={shippingOptions}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </section>
                <section className={styles1.rightSec}>
                    <section className={classnames(styles.cart, styles.checkoutCart)}>
                        <div className={styles.cartHeader}>
                            <div className={styles.left}>
                                <img src="/images/cart.svg" alt="" />
                                <p>Your Cart</p>
                                <small>{cartSize} items</small>
                            </div>
                        </div>
                        <div className={styles.cartItemList}>
                            {Object.entries(cart.items).map(([productId, product]) => {
                                return (
                                    <CartItem
                                        key={productId}
                                        checkoutModalState={setCheckoutModalState}
                                        product={product}
                                    />
                                );
                            })}
                        </div>
                        <hr />
                        <div className={styles.row}>
                            <p>Subtotal</p>
                            <p>₹{(prices.amount / 100).toFixed(2)}</p>
                        </div>
                        <div className={styles.row}>
                            <p>Tax (GST)</p>
                            <p>₹{(prices.tax / 100).toFixed(2)}</p>
                        </div>
                        {shippingCost > 0 ? (
                            <>
                                <div className={styles.row}>
                                    <p>Shipping</p>
                                    <p>₹{shippingCost.toFixed(2)}</p>
                                </div>
                                <div className={classnames(styles.row, styles.total)}>
                                    <p>Total</p>
                                    <p>₹{((prices.amount + prices.tax) / 100 + shippingCost).toFixed(2)}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.row}>
                                    <p>Shipping (to be calculated)</p>
                                    <p>-</p>
                                </div>
                                <div className={classnames(styles.row, styles.total)}>
                                    <p>Estimated Total</p>
                                    <p>₹{((prices.amount + prices.tax) / 100).toFixed(2)}</p>
                                </div>
                            </>
                        )}
                        <div
                            title={"Place Order"}
                            className={classnames(styles.checkout, shippingCost > 0 ? "" : styles.disabled)}
                            onClick={createOrder}
                        >
                            {placeText}
                        </div>
                        <p></p>
                    </section>
                </section>
            </section>
        </>
    );
};

export default Checkout;

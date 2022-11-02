import styles1 from "../styles/components/checkout.module.css";
import Countries from "./countries";
import States from "./states";
 const CheckoutForm = ({startShipProcess,setStates,userPayInfo,setUserPayInfo,states}) => {
    return (
        <>
            <form
                className={styles1.addressForm}
                id="address-form"
                name="address-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    startShipProcess();
                }}
            >
                <div className={styles1.selectWrap}>
                    <Countries states={setStates} currentValue={userPayInfo.country} updateUserInfo={setUserPayInfo} />
                </div>
                <div className={styles1.halfInputForm}>
                    <div className={styles1.selectWrap}>
                        <States states={states} currentValue={userPayInfo.state} updateUserInfo={setUserPayInfo} />
                    </div>
                    <input
                        type={"text"}
                        placeholder={"City"}
                        value={userPayInfo.city}
                        onChange={(e) =>
                            setUserPayInfo(
                                (userPayInfo) => ({
                                    ...userPayInfo,
                                    city: e.target.value,
                                })
                            )
                        }
                        name="city"
                        id="city"
                        required
                    />
                </div>
                <div className={styles1.halfInputForm}>
                    <input
                        type={"text"}
                        placeholder={"Address"}
                        value={userPayInfo.address}
                        onChange={(e) =>
                            setUserPayInfo(
                                (userPayInfo) => ({
                                    ...userPayInfo,
                                    address: e.target.value,
                                })
                            )
                        }
                        name="address"
                        id="address"
                        required
                    />
                    <input
                        type={"number"}
                        placeholder={"Zip Code"}
                        value={userPayInfo.zipcode}
                        onChange={(e) =>
                            setUserPayInfo((zipcode) => ({
                                ...userPayInfo,
                                zipcode: e.target.value,
                            }))
                        }
                        name="pincode"
                        id="pincode"
                        required
                    />
                </div>
                <div className={styles1.halfInputForm}>
                    <input
                        type={"text"}
                        placeholder={"First Name"}
                        value={userPayInfo.fName}
                        onChange={(e) =>
                            setUserPayInfo(
                                (userPayInfo) => ({
                                    ...userPayInfo,
                                    fName: e.target.value,
                                })
                            )
                        }
                        name="fname"
                        id="fname"
                        required
                    />
                    <input
                        type={"text"}
                        placeholder={"Last Name"}
                        value={userPayInfo.lName}
                        onChange={(e) =>
                            setUserPayInfo(
                                (userPayInfo) => ({
                                    ...userPayInfo,
                                    lName: e.target.value,
                                })
                            )
                        }
                        name="lname"
                        id="lname"
                        required
                    />
                </div>
                <input
                    type={"tel"}
                    placeholder={"Phone Number"}
                    value={userPayInfo.phnNo}
                    maxLength="10"
                    pattern=".{10,}"
                    minLength="10"
                    onChange={(e) =>
                        setUserPayInfo((userPayInfo) => ({
                            ...userPayInfo,
                            phnNo: e.target.value,
                        }))
                    }
                    name="phone"
                    id="phone"
                    required
                />
                <input
                    type={"email"}
                    placeholder={"Email"}
                    value={userPayInfo.email}
                    onChange={(e) =>
                        setUserPayInfo((userPayInfo) => ({
                            ...userPayInfo,
                            email: e.target.value,
                        }))
                    }
                    name="email"
                    id="email"
                    required
                />
            </form></>
    )
}

export default CheckoutForm;
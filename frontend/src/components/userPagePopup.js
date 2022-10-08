import React, { useState } from "react"
import styles from "../styles/components/user.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { editUser, updateAddr } from "../app/authSlice";
import updateUserDb from "../api/update";

let initState = {
    phnNo: '',
    fName: '',
    lName: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: ''
}

export const UserPopup = ({ state, setState }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authState);
    const [formState, setFormState] = useState(initState)

    useEffect(() => {
        if (state.index !== -1 && state.vr === 2) {
            setFormState({ ...user.user.address.data[state.index], phnNo: user.user.phone ?? "" })
        } else {
            setFormState((formState) => ({ ...initState, phnNo: user.user.phone ?? "" }))
        }
    }, [state, user])

    const update = async (e) => {
        e.preventDefault();
        if (state.vr === 0) {
            if ((user.user.phone !== formState.phnNo) || !user.user.phone) {
                dispatch(editUser({ phone: formState.phnNo }))
                await updateUserDb({ phone: formState.phnNo }, user.jwt, user.user.id)
            }
        }
        else if (state.vr === 1) {
            let prevAddrs = structuredClone(user.user.address)
            if (!prevAddrs || !prevAddrs.data)
                prevAddrs = {
                    data: []
                }
            let newAddr = structuredClone(formState)
            delete newAddr.phnNo
            prevAddrs.data = [...prevAddrs.data, newAddr]
            dispatch(updateAddr(prevAddrs))
            updateUserDb({ address: prevAddrs }, user.jwt, user.user.id)
        }
        else {
            let prevAddrs = structuredClone(user.user.address)
            let newAddr = structuredClone(formState)
            delete newAddr.phnNo
            prevAddrs.data[state.index] = newAddr
            dispatch(updateAddr(prevAddrs))
            updateUserDb({ address: prevAddrs }, user.jwt, user.user.id)
        }
        setState((old) => ({ ...old, visible: 0 }))
    };


    return (<>
        {state.visible ?
            <>
                <div className={styles.backDrop} onClick={(e) => e.stopImmediatePropagation()} />
                <div className={styles.userPop}>
                    <div className={styles.header}>
                        <h1>{state.header}</h1>
                        <img src="/images/close.svg" alt="close icon" onClick={() => setState((old) => ({ ...old, visible: 0 }))} />
                    </div>
                    <form onSubmit={update}>
                        {
                            state.vr ?
                                <>
                                    <div className={styles.formInput}>
                                        <label htmlFor="fname" style={{ paddingTop: "0" }}>First Name</label>
                                        <input type={"text"} placeholder="John" id="fname" value={formState.fName} onChange={(e) => setFormState({ ...formState, fName: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="lname">Last Name</label>
                                        <input type={"text"} placeholder="Doe" id="lname" value={formState.lName} onChange={(e) => setFormState({ ...formState, lName: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="address">Address</label>
                                        <input type={"text"} placeholder="XYZ" value={formState.address} id="address" name="address" onChange={(e) => setFormState({ ...formState, address: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="city">City</label>
                                        <input type={"text"} placeholder="ABC" value={formState.city} id="city" onChange={(e) => setFormState({ ...formState, city: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="state">State</label>
                                        <input type={"text"} placeholder="PQ" value={formState.state} id="state" onChange={(e) => setFormState({ ...formState, state: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="zip">Zip Code</label>
                                        <input type={"text"} placeholder="XXXX" value={formState.zipcode} id="zip" onChange={(e) => setFormState({ ...formState, zipcode: e.target.value })} required />
                                    </div>
                                    <div className={styles.formInput}>
                                        <label htmlFor="country">Country</label>
                                        <input type={"text"} placeholder="India" value={formState.country} id="country" onChange={(e) => setFormState({ ...formState, country: e.target.value })} required />
                                    </div>
                                </> :
                                <div className={styles.formInput}>
                                    <label htmlFor="phone">Mobile</label>
                                    <input type={"tel"} placeholder="Phone Number" id="phone" value={formState.phnNo} onChange={(e) => setFormState({ ...formState, phnNo: e.target.value })} required />
                                </div>

                        }

                        <div className={styles.formFoot}>
                            <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "17px", color: "#54605F" }}>
                                <button type={"submit"} className={styles.btn}>{state.vr === 1 ? "Add Address" : "Update"}</button>
                            </div>
                            <div className={styles.btn} onClick={() => setState((old) => ({ ...old, visible: 0 }))}>Cancel</div>
                        </div>
                    </form>
                </div></> : <></>}
    </>)
}
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/components/user.module.css"
import { useDispatch, useSelector } from "react-redux";
import { updateAddr } from "../app/authSlice";
import updateUserDb from "../api/update";
export const ContactInfo = ({ popState }) => {
    const { user } = useSelector((state) => state.authState);
    return (<>
        <div className={styles.elemContent}>
            <div className={styles.elemHead}>
                <h1>Contact Information</h1>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.head}>Email:</td>
                        <td>{user?.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.head}>Mobile:</td>
                        <td>
                            {user?.phone ?? "Not Provided"}
                            <img src="/images/edit_icon.svg" alt="edit icon" onClick={() => popState((old) => ({ ...old, visible: 1, vr: 0, header: "Contact Information" }))} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}

export const ShippingInfo = ({ addresses, popState }) => {

    const user = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const deleteAddr = (e, index) => {
        e.stopPropagation();
        let prevAddrs = structuredClone(user.user.address)
        prevAddrs.data = prevAddrs.data.filter((x, n) => {
            if (n !== index)
                return true
            return false
        })
        dispatch(updateAddr(prevAddrs))
        updateUserDb({ address: prevAddrs }, user.jwt, user.user.id)
    }

    return (<>
        <div className={styles.elemContent}>
            <div className={`${styles.elemHead} ${styles.ship}`}>
                <h1>Shipping Address</h1>
                <img src="/images/add_icon.svg" alt="add icon" onClick={() => { popState((old) => ({ ...old, visible: 1, vr: 1, header: "Add New Shipping Address" })) }} />
            </div>
            <table className={styles.addresses}>
                <tbody>
                    {
                        addresses?.data?.length ? addresses.data.map((item, n) => {
                            return (
                                <tr key={n} onClick={() => { popState((old) => ({ ...old, vr: 2, visible: 1, header: "Shipping Address", index: n })) }}>
                                    <td>
                                        <div className={styles.address}>
                                            {item.fName} {item.lName}
                                            <br />
                                            {item.address}
                                            <br />
                                            {item.city}, {item.state} - {item.zipcode}
                                            <br />
                                            {item.country}
                                        </div>
                                    </td>
                                    <td className={styles.editAddr}>
                                        <img src="/images/edit_icon.svg" alt="edit icon" />
                                        <i className="far fa-trash-alt" onClick={(e) => deleteAddr(e, n)}></i>
                                    </td>
                                </tr>
                            )
                        }) : <tr><td style={{ fontWeight: "400", opacity: 0.5 }}>No Saved Address</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </>)
}

const NavLinkWithUnderline = ({ to, text }) => {
    const [linkOpen, setLinkOpen] = useState(false);

    return (
        <NavLink to={to} className={({ isActive }) => setLinkOpen(isActive)} >
            <div className={classNames(styles.item, linkOpen ? styles.active : "")}>
                {text}
            </div>
        </NavLink>
    );
};

const User = () => {
    const user = useSelector((state) => state.authState);
    const indRef = useRef();
    const { pathname } = useLocation()
    const navigate = useNavigate();
    useEffect(() => {
        if (pathname.includes("orders"))
            indRef.current.style.left = "90px";
        else
            indRef.current.style.left = "0px";
    }, [pathname])

    useEffect(() => {
        if (!user.isLoggedIn) {
            navigate("/login")
        }
    }, [user]);

    return (
        <>
            <div className={styles.userWrap}>
                <div className={styles.userNav}>
                    <NavLinkWithUnderline to={"profile"} text="Profile" >
                    </NavLinkWithUnderline>
                    <NavLinkWithUnderline to={"orders"} text="Orders" >
                    </NavLinkWithUnderline>
                </div>
                <div className={styles.indicator} ref={indRef}></div>
                <div className="tabs">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default User;
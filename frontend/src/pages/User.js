import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserBasicElem } from "../components/UserBasic";
import { UserPageItem } from "../components/userPageItem";
import styles from "../styles/components/user.module.css"
import { motion } from "framer-motion"

const ContactInfo = ({ mobile = "Not Provided", email = "email@email.com" }) => {
    return (<>
        <div className={styles.elemContent}>
            <h1>Contact Information</h1>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.head}>Email:</td>
                        <td>{email}</td>
                    </tr>
                    <tr>
                        <td className={styles.head}>Mobile:</td>
                        <td>{mobile}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}

const ShippingInfo = ({ addresses }) => {

    return (<>
        <div className={styles.elemContent}>
            <h1 className={styles.shippingH}>Shipping Address</h1>
            <div className={styles.addresses}>
                {
                    addresses ? addresses.map((item, n) => {
                        return <div className={styles.address} key={n}>
                            {item.fName} {item.lName}
                            <br />
                            {item.address}
                            <br />
                            {item.city}, {item.state} - {item.zipcode}
                            <br />
                            {item.country}
                        </div>
                    }) : "No Saved Address"
                }
            </div>
        </div>
    </>)
}

const container = {
    hidden: {

        opacity: 0,
    }
    ,
    show: {

        opacity: 1,
        transition: {
            staggerChildren: 0.5
        }
    }
}

const item = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
    }
}


const User = () => {
    const [navState, setNavState] = useState(0);
    const indRef = useRef();
    useEffect(() => {
        if (navState) {
            indRef.current.style.left = "90px";
        } else {
            indRef.current.style.left = "0px";
        }
    }, [navState])
    return (
        <>
            <div className={styles.userWrap}>
                <div className={styles.userNav}>
                    <div className={classNames(styles.item, navState > 0 ? "" : styles.active)} onClick={() => setNavState(0)}>
                        Profile
                    </div>
                    <div className={classNames(styles.item, navState > 0 ? styles.active : "")} onClick={() => setNavState(1)}>
                        Orders
                    </div>
                </div>
                <div className={styles.indicator} ref={indRef}></div>
                <motion.div

                    variants={container}

                    initial="hidden"
                    animate="show"

                    className={styles.userPager}
                >

                    <motion.div variants={item}>
                        <UserPageItem Child={UserBasicElem} index={0} />
                    </motion.div>

                    <motion.div variants={item}>

                        <UserPageItem Child={ContactInfo} />
                    </motion.div>


                    <motion.div variants={item}>

                        <UserPageItem Child={ShippingInfo} addresses={[
                            { fName: "Ishaan", lName: "Das", address: "The New School, 66 West 12th Street", city: "New York", state: "NY", zipcode: "11003XB", country: "USA" }
                        ]} />
                    </motion.div>
                </motion.div>
                <div className={styles.userFoot}>
                    <div className={styles.buttons}>
                        <div className={styles.changePBt}>
                            <img src="/images/password-change.svg" alt="change password" width={19} />&nbsp;&nbsp;Change Password
                        </div>
                        <Link to={"/logout"}>
                            <div className={styles.logoutBt} >
                                <img src="/images/logout.svg" alt="change password" width={19} style={{ transform: "rotate(180deg)" }} />&nbsp;&nbsp;Logout
                            </div>
                        </Link>
                    </div>
                    <div className={styles.deleteAcc}>
                        <i className="far fa-trash-alt"></i>&nbsp;&nbsp;<p>Delete my account</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User;
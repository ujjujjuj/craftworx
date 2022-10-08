import styles from "../styles/components/user.module.css"
import { UserPageItem } from "../components/userPageItem";
import { ContactInfo, ShippingInfo } from "../pages/User";
import { Link } from "react-router-dom";
import { UserPopup } from "./userPagePopup";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
    const user = useSelector((state) => state.authState);
    const [popState, setPopState] = useState({
        visible: 0,
        header: "Contact Informatoin",
        success: () => { },
        vr: 0,
        index: -1
    });

    return (<>
        <div className={styles.userPager}>
            <UserPopup state={popState} setState={setPopState} />
            <p className={styles.helloText}>Hi, {user.user?.firstName}</p>
            <UserPageItem Child={ContactInfo} popState={setPopState} />
            <UserPageItem Child={ShippingInfo} addresses={user.user?.address} popState={setPopState} />
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
    </>)
}
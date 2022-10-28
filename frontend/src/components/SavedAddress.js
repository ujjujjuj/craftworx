import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../styles/components/checkout.module.css";

const dropdownOptions = [
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dicta hic dolorum, nobis dolore possimus placeat quam omnis? Aspernatur soluta error fugit magnam non harum repellendus optio deleniti itaque esse.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dicta hic dolorum, nobis dolore possimus placeat quam omnis? Aspernatur soluta error fugit magnam non harum repellendus optio deleniti itaque esse.",
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure dicta hic dolorum, nobis dolore possimus placeat quam omnis? Aspernatur soluta error fugit magnam non harum repellendus optio deleniti itaque esse.",
]

export const SavedAddress = ({ setState, setAddr }) => {
    const [dropState, setDropState] = useState({
        visible: 0,
        selection: 0
    });

    const [dropOptions, setDropOptions] = useState((dropdownOptions))
    const user = useSelector((state) => state.authState);
    const [currentAddress, setCurrentAddr] = useState({})
    useEffect(() => {
        setDropOptions(user.user.address.data)
    }, [user]);

    useEffect(() => {
        setCurrentAddr(dropOptions[dropState.selection])
    }, [dropState, dropOptions]);

    return (
        <>
            <div className={styles.savedAdr}>
                <h3>Saved Addresses</h3>
                <div className={styles.addAddr} onClick={() => {
                    setAddr({
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
                    setState("authWA")
                }}>
                    <img src="/images/add_icon.svg" alt="add icon" width={20} />
                    <p>Add new address</p>
                </div>
            </div>
            <div className={styles.sort} onClick={() => setDropState((x) => ({ ...x, visible: !x.visible }))}>
                <p unselectable="on">
                    {currentAddress.fName} {currentAddress.lName}, {currentAddress.address}, {currentAddress.city}, {currentAddress.state}, {currentAddress.zipcode}, {currentAddress.country}
                </p>
                <ul className={classNames(styles.dropList, dropState.visible ? styles.ulExpanded : "")}>
                    {dropOptions.map((currentAddress, index) => (
                        <li
                            key={index}
                            className={index === dropState.selection ? styles.selected : ""}
                            onClick={() => {
                                setDropState((state) => ({ ...state, selection: index }))
                            }}
                        >
                            <p>
                                {currentAddress.fName} {currentAddress.lName}, {currentAddress.address}, {currentAddress.city}, {currentAddress.state}, {currentAddress.zipcode}, {currentAddress.country}
                            </p>
                        </li>
                    ))}
                </ul>
                <img src="/images/drop.svg" className={dropState.visible ? styles.rotate : ""} alt="" />
            </div>
            <div className={styles.endForm}>
                <button className={styles.button} style={{ marginTop: "15px" }} onClick={() => {
                    setAddr((current) => ({ ...current, ...dropOptions[dropState.selection], email: user.user.email, phnNo: user.user.phone ?? "" }))
                    setState("authWA")
                }}>
                    Continue
                </button>
            </div>
        </>
    )
}
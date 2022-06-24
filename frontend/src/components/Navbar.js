import styles from "../styles/components/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import classnames from "classnames";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

const Navbar = () => {
    const { cart, toggleCart, getCartSize } = useCart();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const checkEnter = (e) => {
        if (e.key === "Enter") {
            setSearch("");
            navigate(`/shop?q=${search}`);
        }
    };

    useEffect(() => {
        console.log(cart)
    }, [cart]); 


    return (
        <nav className={location.pathname.includes("checkout")?styles.hide:styles.show}>
            <div className={styles.left}>
                <Link to="/">
                    <div className={classnames(styles.item, styles.logoNav)}>
                        <img src="/images/CW.svg" alt="" />
                    </div>
                </Link>
                <Link to="/shop">
                    {" "}
                    <div className={styles.item}>Shop</div>
                </Link>
                <Link to="/bespoke">
                    <div className={styles.item}>Bespoke</div>
                </Link>
                <Link to="/corporate">
                    <div className={styles.item}>Corporate</div>
                </Link>
                <Link to="/about">
                    <div className={styles.item}>About Us</div>
                </Link>
                <Link to="/contact">
                <div className={styles.item}>Contact</div>
                </Link>
            </div>
            <div className={styles.right}>
                <div className={classnames(styles.item, styles.navSearch)}>
                    <input
                        type={"text"}
                        placeholder="Search Products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={checkEnter}
                    />
                    <img src="/images/search.svg" alt="" />
                </div>
                <div className={classnames(styles.item, styles.cartNav)} onClick={toggleCart}>
                    <div className={styles.cartWrap}>
                        {Object.keys(cart.items).length ? <span className={styles.cartIndicator}>{getCartSize()}</span> : <></>}
                        <img src="/images/cart.svg" alt="" />
                    </div>
                    &nbsp; Cart
                </div>
                <div className={styles.item}>
                    {user.isLoggedIn ? (
                        <Link to="/logout">Logout</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

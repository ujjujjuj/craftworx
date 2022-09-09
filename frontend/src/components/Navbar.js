import styles from "../styles/components/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import classnames from "classnames";
import { useCart } from "../hooks/cart";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import useWindowDimensions from "../hooks/windowDimensions";

const Navbar = () => {
    const { cart, toggleCart, getCartSize } = useCart();
    const { user } = useAuth();
    const location = useLocation();
    const [isNavExpanded, setNavExpanded] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { height, width } = useWindowDimensions();
    const checkEnter = (e) => {
        if (e.key === "Enter") {
            setSearch("");
            navigate(`/shop?q=${search}`);
        }
    };

    useEffect(() => {
    }, [cart]);


    return (
        <>
            <nav className={location.pathname.includes("checkout") ? styles.hide : styles.show}>
                <div className={styles.left}>
                    <Link to="/">
                        <div className={classnames(styles.item, styles.logoNav)}>
                            <img src="/images/CW.svg" alt="" />
                        </div>
                    </Link>
                    {width < 975 ? <></> :
                        <>
                            <Link to="/shop">
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
                        </>}
                </div>
                {width < 975 ? <div className={classnames(styles.item, styles.navSearch, styles.stretch)}>
                    <input
                        type={"text"}
                        placeholder="Search Products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={checkEnter}
                    />
                    <img src="/images/search.svg" alt="" />
                </div> : <></>}
                <div className={styles.right}>
                    {width > 974 ? <div className={classnames(styles.item, styles.navSearch)}>
                        <input
                            type={"text"}
                            placeholder="Search Products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={checkEnter}
                        />
                        <img src="/images/search.svg" alt="" />
                    </div> : <></>}
                    <div className={classnames(styles.item, styles.cartNav)} onClick={toggleCart}>
                        <div className={styles.cartWrap}>
                            {Object.keys(cart.items).length ? <span className={styles.cartIndicator}>{getCartSize()}</span> : <></>}
                            <img src="/images/cart.svg" alt="" />
                        </div>
                        {width > 974 ? <>&nbsp; Cart</> : ''}
                    </div>
                    {width > 974 ? <div className={styles.item} style={{ marginRight: 0 }}>
                        {user.isLoggedIn ? (
                            <Link to="/logout">Logout</Link>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </div> : <><div style={{ zIndex: 10000, display: "flex", alignItems: "center" }}>

                        <div className={classnames(styles.mobileNav, isNavExpanded ? styles.expanded : "")}>
                        </div>
                        <div className={classnames(styles.mobileNavList)}>
                            <Link to='/'><h1>Craftworx Agra</h1></Link>
                            <Link to="/shop">
                                <div className={styles.itemWrap}>
                                    <div className={styles.item}>Shop</div>
                                </div>
                            </Link>
                            <Link to="/bespoke">
                                <div className={styles.itemWrap}>

                                    <div className={styles.item}>Bespoke</div>
                                </div>
                            </Link>
                            <Link to="/corporate">
                                <div className={styles.itemWrap}>

                                    <div className={styles.item}>Corporate</div>
                                </div>
                            </Link>
                            <Link to="/about">
                                <div className={styles.itemWrap}>

                                    <div className={styles.item}>About Us</div>
                                </div>
                            </Link>
                            <Link to="/contact">
                                <div className={styles.itemWrap}>

                                    <div className={styles.item}>Contact</div>
                                </div>
                            </Link>
                        </div>
                        <img src={isNavExpanded ? "/images/close.svg" : "/images/hamburger.svg"} className={styles.crossExpanded} onClick={() => {
                            setNavExpanded((navExpanded) => {
                                return !navExpanded
                            })
                        }} style={{ marginLeft: 10, zIndex: 10000 }} alt="" />
                    </div>
                    </>}
                </div>
            </nav>

        </>
    );
};

export default Navbar;

import styles from "../styles/components/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "../hooks/windowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { getCartSize, toggleCart } from "../app/cartSlice";

const Navbar = () => {
    const cart = useSelector((state) => state.cartState);
    const cartSize = useSelector(getCartSize);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authState);
    const location = useLocation();
    const [isNavExpanded, setNavExpanded] = useState(false)
    const [isUserExpanded, setUserExpanded] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { width } = useWindowDimensions();
    const checkEnter = (e) => {
        if (e.key === "Enter") {
            setSearch("");
            navigate(`/shop?q=${search}`);
        }
    };

    return (
        <>
            <nav className={location.pathname.includes("checkout") ? styles.hide : styles.show}>
                <div className={styles.left}>
                    <Link to="/">
                        <div className={classnames(styles.item, styles.logoNav)}>
                            <img src="/images/CW.svg" alt="" />
                        </div>
                    </Link>
                    {width < 975 ? (
                        <></>
                    ) : (
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
                        </>
                    )}
                </div>
                {width < 975 ? (
                    <div className={classnames(styles.item, styles.navSearch, styles.stretch)}>
                        <input
                            type={"text"}
                            placeholder="Search Products"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={checkEnter}
                        />
                        <img src="/images/search.svg" alt="" />
                    </div>
                ) : (
                    <></>
                )}
                <div className={styles.right}>
                    {width > 974 ? (
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
                    ) : (
                        <></>
                    )}
                    <div
                        className={classnames(styles.item, styles.cartNav)}
                        onClick={() => {
                            dispatch(toggleCart());
                        }}
                    >
                        <div className={styles.cartWrap}>
                            {Object.keys(cart.items).length ? (
                                <span className={styles.cartIndicator}>{cartSize}</span>
                            ) : (
                                <></>
                            )}
                            <img src="/images/cart.svg" alt="" />
                        </div>
                        {width > 974 ? <>&nbsp; Cart</> : ""}
                    </div>
                    {width > 974 ? <div className={classnames(styles.item, styles.userMenuWrap)} style={{ marginRight: 0 }}>
                        {user.isLoggedIn ? (
                            <>
                                <img src="/images/user-icon.svg" alt="user icon" onClick={() => { setUserExpanded((current) => !current) }} />
                                <div className={styles.parent}>
                                    <div className={classnames(styles.userMenu, isUserExpanded ? styles.expanded : "")} onClick={() => { setUserExpanded((current) => !current) }}>
                                        <Link to="/user/profile">My Account</Link>
                                        <Link to="/logout">Logout</Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link to="/login">Login</Link>
                        )}
                    </div> : (
                        <><div style={{ zIndex: 10000, display: "flex", alignItems: "center" }}>
                            <div className={classnames(styles.mobileNav, isNavExpanded ? styles.expanded : "")}>
                            </div>
                            <div className={classnames(styles.mobileNavList)}>
                                <Link to="/">
                                    <h1>Craftworx Agra</h1>
                                </Link>
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
                            <img
                                src={isNavExpanded ? "/images/close.svg" : "/images/hamburger.svg"}
                                className={styles.crossExpanded}
                                onClick={() => {
                                    setNavExpanded((navExpanded) => {
                                        return !navExpanded;
                                    });
                                }}
                                style={{ marginLeft: 10, zIndex: 10000 }}
                                alt=""
                            />
                        </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;

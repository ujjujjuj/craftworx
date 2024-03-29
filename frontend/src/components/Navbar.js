import styles from "../styles/components/Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classnames from "classnames";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "../hooks/windowDimensions";
import { useSelector, useDispatch } from "react-redux";
import { getCartSize, getCartValue, toggleCart } from "../app/cartSlice";
import { useEffect } from "react";
import { gtag } from "ga-gtag";

const tabs = [
    {
        label: "Shop",
        route: '/shop'
    }, {
        label: "Bespoke",
        route: '/bespoke'
    },
    {
        label: "Corporate",
        route: '/corporate'
    },
    {
        label: "About Us",
        route: '/about'
    }, {
        label: "Contact",
        route: '/contact'
    }
]


const Navbar = () => {
    const cart = useSelector((state) => state.cartState);
    const cartSize = useSelector(getCartSize);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authState);
    const cartValue = useSelector(getCartValue);
    const location = useLocation();
    const [isNavExpanded, setNavExpanded] = useState(false)
    const [isUserExpanded, setUserExpanded] = useState(false)
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const { width } = useWindowDimensions();
    const checkEnter = (e) => {
        if (e.key === "Enter") {
            setSearch("");
            gtag("event", "search")
            gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
                fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        client_id: clientId,
                        events: [{
                            "name": "search",
                            "params": {
                                "search_term": search
                            }
                        }]
                    })
                })
            });
            navigate(`/shop?q=${search}`);
        }
    };

    useEffect(() => {
        if (isNavExpanded)
            setNavExpanded(false)
    }, [location])


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
                            {
                                tabs.map((x, n) => {
                                    return <NavLink to={x.route} key={n} className={({ isActive }) =>
                                        (isActive ? styles.selected : "")
                                    }>
                                        <div className={styles.item}>{x.label}</div>
                                    </NavLink>
                                })
                            }
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
                        <img src="/images/search.svg" onClick={() => {
                            gtag("event", "search")
                            gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
                                fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: 'POST',
                                    body: JSON.stringify({
                                        client_id: clientId,
                                        events: [{
                                            "name": "search",
                                            "params": {
                                                "search_term": search
                                            }
                                        }]
                                    })
                                })
                            });
                            navigate(`/shop?q=${search}`);
                        }} alt="" />
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
                            <img src="/images/search.svg" onClick={() => {
                                gtag("event", "search")
                                gtag('get', 'G-SC82Z7RD6Y', 'client_id', (clientId) => {
                                    fetch('https://api.craftworxagra.co.in/api/analytics/collect', {
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        method: 'POST',
                                        body: JSON.stringify({
                                            client_id: clientId,
                                            events: [{
                                                "name": "search",
                                                "params": {
                                                    "search_term": search
                                                }
                                            }]
                                        })
                                    })
                                });
                                navigate(`/shop?q=${search}`);
                            }} alt="" />
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
                                <NavLink to="/">
                                    <h1>Craftworx Agra</h1>
                                </NavLink>
                                {
                                    tabs.map((x, n) => {
                                        return <NavLink to={x.route} className={({ isActive }) =>
                                            (isActive ? styles.selected : "")
                                        } key={n}>
                                            <div className={styles.itemWrap}>
                                                <div className={styles.item}>{x.label}</div>
                                            </div>
                                        </NavLink>
                                    })
                                }
                                {user.isLoggedIn ? (
                                    <NavLink to="/user/profile" className={({ isActive }) =>
                                        (isActive ? styles.selected : "")
                                    }>
                                        <div className={styles.itemWrap}>
                                            <div className={styles.item}>
                                                My Account
                                            </div>
                                        </div>
                                    </NavLink>
                                ) : (
                                    <NavLink to="/login" className={({ isActive }) =>
                                        (isActive ? styles.selected : "")
                                    }>
                                        <div className={styles.itemWrap}>
                                            <div className={styles.item}>
                                                Login
                                            </div>
                                        </div>
                                    </NavLink>
                                )}
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

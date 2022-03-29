import styles from "../styles/components/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import classnames from "classnames";
import { useCart } from "../hooks/cart";
import { useState } from "react";

const Navbar = () => {
    const { toggleCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const checkEnter = (e) => {
        if (e.key === "Enter") {
            setSearch("");
            navigate(`/shop?q=${search}`);
        }
    };

    return (
        <nav>
            <div className={styles.left}>
                <Link to="/">
                    {" "}
                    <div className={classnames(styles.item, styles.logoNav)}>
                        <img src="/images/logo.png" alt="" />
                    </div>
                </Link>
                <Link to="/shop">
                    {" "}
                    <div className={styles.item}>Shop</div>
                </Link>
                <div className={styles.item}>About Us</div>
                <div className={styles.item}>Contact</div>
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
                    <img src="/images/cart.svg" alt="" />
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

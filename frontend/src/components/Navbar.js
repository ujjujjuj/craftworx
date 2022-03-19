import styles from "../styles/components/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../helpers/auth";

const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className={styles.navContainer}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            {user.isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
        </nav>
    );
};

export default Navbar;

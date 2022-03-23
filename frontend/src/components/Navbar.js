import styles from "../styles/components/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import classnames from 'classnames';
import {useCart} from "../hooks/cart"

const Navbar = () => {
    const {toggleCart} = useCart();
    const { user } = useAuth();
    return (
         <nav>
           
         <div className={styles.left}>
         <Link to="/"> <div className={classnames(styles.item,styles.logoNav)}>
             <img src="/images/logo.png" alt=""/>
           </div></Link>
           <Link to="/shop"> <div className={styles.item}>
             Shop
           </div></Link>
           <div className={styles.item}>
             About Us
           </div>
           <div className={styles.item}>
             Contact
           </div>
         </div>
         <div className={styles.right}>
            <div className={classnames(styles.item,styles.navSearch)}>
           <input type={"text"} placeholder="Search Products" />
           <img src="/images/search.svg"  alt=""/>
            </div>
           <div className={classnames(styles.item,styles.cartNav)} onClick={toggleCart}>
               <img src="/images/cart.svg" alt=""/>
            &nbsp; Cart
           </div>
           <div className={styles.item}>
           {user.isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
           </div>
         </div>
       </nav>
    );
};

export default Navbar;
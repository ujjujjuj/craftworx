import styles from "../styles/components/Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../helpers/auth";

const Navbar = () => {
    const { user } = useAuth();
    return (
         <nav>
         <div className="left">
         <Link to="/"> <div className="item logo-nav">
             <img src="/images/logo.png" alt=""/>
           </div></Link>
           <Link to="/shop"> <div className="item">
             Shop
           </div></Link>
           <div className="item">
             About Us
           </div>
           <div className="item">
             Contact
           </div>
         </div>
         <div className="right">
            <div className="item nav-search">
           <input type={"text"} placeholder="Search Products" />
           <img src="/images/search.svg"  alt=""/>
            </div>
           <div className="item cart-nav">
               <img src="/images/cart.svg" alt=""/>
            &nbsp; Cart
           </div>
           <div className="item">
           {user.isLoggedIn ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
           </div>
         </div>
       </nav>
    );
};

export default Navbar;
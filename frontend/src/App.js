import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Callback from "./pages/Callback";
import Logout from "./pages/Logout";
import ProductShow from "./pages/productShow"
import Checkout from "./pages/Checkout";
import Footer from "./components/footer";
import About from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Privacy from "./pages/Privacy";
import Bespoke from "./pages/Bespoke";
import Corporate from "./pages/Corporate";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import OrderSuccess from "./pages/OrderSuccess";
import User from "./pages/User";
import { Profile } from "./components/Profile";
import { Orders } from "./components/Orders";
import { Reset } from "./pages/Reset";
import { NewPass } from "./pages/NewPass";
import { NotFound } from "./pages/NotFound";
import { ChangePass } from "./pages/ChangePass";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Cart />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/returnpolicy" element={<Refund />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/callback" element={<Callback />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/bespoke" element={<Bespoke />} />
                <Route path="/corporate" element={<Corporate />} />
                <Route path="/success" replace element={<OrderSuccess />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/order" element={<OrderSuccess />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="/change-password" element={<ChangePass />} />
                <Route path="/auth/reset-password" element={<NewPass />} />
                <Route path="/user" element={<User />} >
                    <Route index element={<Navigate replace to="profile" />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="*" element={<Navigate to={"/404"} />} />
                </Route>
                <Route exact path="/product/:id" element={<ProductShow />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

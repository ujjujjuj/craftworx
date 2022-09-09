import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import { AuthProvider } from "./hooks/auth";
import Callback from "./pages/Callback";
import Logout from "./pages/Logout";
import {CartProvider} from "./hooks/cart"
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

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
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
                    <Route path="/about" element={<About />}/>
                    <Route path="/auth/callback" element={<Callback />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/bespoke" element={<Bespoke />} />
                    <Route path="/corporate" element={<Corporate />} />
                    <Route path="/success" element={<OrderSuccess />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/contact" element={<ContactUs />}/>    
                    <Route exact path="/product/:id" element={<ProductShow/>}/>
                </Routes>
                <Footer></Footer>
            </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;

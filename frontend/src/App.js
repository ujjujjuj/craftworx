import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import { AuthProvider } from "./helpers/auth";
import Callback from "./pages/Callback";
import Logout from "./pages/Logout";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/auth/callback" element={<Callback />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

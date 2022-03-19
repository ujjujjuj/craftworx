import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../helpers/auth";

const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/local/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.data === null) {
                    return console.log(data);
                }
                loginUser(data);
                navigate("/shop");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            Login
            <form onSubmit={formSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) => setFormData((old) => ({ ...old, identifier: e.target.value }))}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) => setFormData((old) => ({ ...old, password: e.target.value }))}
                />
                <input type="submit" />
            </form>
            <br />
            Don't have an account? <Link to="/register">Register</Link>
            <br />
            <a href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`}>
                Login using google
            </a>
        </>
    );
};

export default Login;

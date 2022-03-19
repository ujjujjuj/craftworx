import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../helpers/auth";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const formSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/local/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, email: formData.username }),
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
            Register
            <form onSubmit={formSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) => setFormData((old) => ({ ...old, username: e.target.value }))}
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
            Already have an account? <Link to="/login">Login</Link>
        </>
    );
};

export default Register;

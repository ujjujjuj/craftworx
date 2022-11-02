import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/components/auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/authSlice";
import { ThreeDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Login = () => {
    const [formData, setFormData] = useState({ identifier: "", password: "" });
    const [passVisible, setPassVisible] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setError] = useState("");
    const togglePass = () => {
        setPassVisible(!passVisible);
    };
    const user = useSelector((state) => state.authState);
    useEffect(() => {
        if (user?.isLoggedIn && !state?.fromCheckout) {
            navigate("/shop");
        }
    }, [user, navigate, state]);
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        if (state?.error) {
            setError(state.error);
        }
    }, []);

    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/local/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.data === null) {
                    setLoading(false);
                    setError("Invalid Email & Password combination");
                    return console.log(data);
                }
                dispatch(loginUser(data));
                if (state?.fromCheckout) navigate("/checkout");
                else navigate("/shop");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <Helmet>
                <title>Craftworx | Login</title>
            </Helmet>
            <main className={styles.auth}>
                <h1>Craftworx Agra</h1>
                <h2>Log in</h2>
                <form onSubmit={formSubmit}>
                    <input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((old) => ({ ...old, identifier: e.target.value }))}
                    />
                    <div className={styles.passWrap}>
                        <input
                            name="password"
                            placeholder="*******"
                            type={passVisible ? "text" : "password"}
                            required
                            onChange={(e) => setFormData((old) => ({ ...old, password: e.target.value }))}
                        />
                        <i className={passVisible ? "fas fa-eye-slash" : "fas fa-eye"} onClick={togglePass}></i>
                    </div>
                    <input type="submit" value="Continue" />
                </form>
                <div className={styles.forgot}>
                    <Link to="/reset">Forgot Password?</Link>
                </div>
                <a href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`} className={styles.googleA}>
                    <div className={styles.google}>
                        <img src="/images/google.svg" alt="Google Login" width="25" />
                        <span>&nbsp;&nbsp; Sign in with Google</span>
                    </div>
                </a>
                <div className={styles.login}>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </div>
                {loading ? (
                    <ThreeDots
                        height="20"
                        width="40"
                        radius="10"
                        color="#54605F"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ marginTop: "20px" }}
                        wrapperClassName=""
                        visible={true}
                    />
                ) : (
                    <></>
                )}
                <p className={styles.error} style={{ opacity: errorMsg.length ? 1 : 0 }}>
                    <i className="fas fa-exclamation-circle"></i>&nbsp;{errorMsg}
                </p>
            </main>
        </>
    );
};

export default Login;

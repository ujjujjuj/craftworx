import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from '../styles/components/auth.module.css';
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../app/authSlice";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", password: "", firstName: "", lastName: "" });
    const [passVisible, setPassVisible] = useState(false);
    const user = useSelector(state => state.authState.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const divRef = useRef(null);
    const [errorMsg, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const togglePass = () => {
        setPassVisible(!passVisible);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (formData.password.length < 6) {
            divRef.current.scrollIntoView({ behavior: 'smooth' });
            setError("Password must be at least 6 characters long")
            return;
        }
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
                    setError(data.error.message)
                    setLoading(false)
                    return console.log(data);
                }
                setLoading(false)
                dispatch(loginUser(data));
                navigate("/shop");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (user?.isLoggedIn) {
            navigate("/shop")
        }
    }, [user]);

    return (
        <>
            <main>
                <h1>Craftworx Agra</h1>
                <h2>Sign Up</h2>
                <form onSubmit={formSubmit}>
                    <input name="firstName" placeholder="First Name" required
                        value={formData.firstName}
                        onChange={(e) => setFormData((old) => ({ ...old, firstName: e.target.value }))}
                    />
                    <input name="lastName" placeholder="Last Name" required
                        value={formData.lastName}
                        onChange={(e) => setFormData((old) => ({ ...old, lastName: e.target.value }))}
                    />

                    <input name="email" placeholder="E-mail" type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData((old) => ({ ...old, username: e.target.value }))}
                    />
                    <div className={styles.passWrap}><input name="password" placeholder="*******" type={passVisible ? "text" : "password"} required onChange={(e) => setFormData((old) => ({ ...old, password: e.target.value }))} /><i className={passVisible ? "fas fa-eye-slash" : "fas fa-eye"} onClick={togglePass}></i></div>
                    <input type="submit" value="Continue" />
                </form>

                <a href={`${process.env.REACT_APP_SERVER_URL}/api/connect/google`} className={styles.googleA}>
                    <div className={styles.google} style={{ marginTop: "0" }}>
                        <img src="/images/google.svg" width="25" />
                        &nbsp;&nbsp; Sign up with Google
                    </div>
                </a>

                <div className={styles.login}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
                {loading ? <ThreeDots
                    height="20"
                    width="40"
                    radius="10"
                    color="#54605F"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{ marginTop: "20px" }}
                    wrapperClassName=""
                    visible={true}
                /> : <></>}
                <div className={styles.error} style={{ paddingBottom: " 30px" }}>
                    {errorMsg.length ? <i className="fas fa-exclamation-circle"></i> : <></>}<p id="error-msg">{errorMsg}</p>
                </div>
            </main>
            <div ref={divRef} />
        </>
    );
};

export default Register;

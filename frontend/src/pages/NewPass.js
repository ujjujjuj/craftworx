import { useState, useMemo, useEffect } from "react";

import styles from "../styles/components/reset.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);
}

export const NewPass = () => {
    const [error, setError] = useState("");
    const { code } = useQuery();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        pass: "",
        repass: "",
    });
    const [passVisible, setPassVisible] = useState(false);
    const [newPassVisible, setNewPassVisible] = useState(false);

    useEffect(() => {
        if (!code)
            navigate("/")
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        if (form.pass !== form.repass) {
            setError("Passwords don't match");
            return;
        }
        if (form.pass.length < 6) {
            setError("Password must be atleast 6 characters long");
            return;
        }
        setLoading(true)
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/reset-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, password: form.pass, passwordConfirmation: form.repass }),
        })
            .then((res) => res.json())
            .then((dat) => {
                setLoading(false)
                if (!dat.jwt) {
                    setError(dat.error.message)
                    return
                }
                navigate("/user/profile")
            })
            .catch((error) => {
                setLoading(false)
                setError(error)
            })
            .finally(() => { });

    };

    return (
        <>
            <section className={styles.resetSec}>
                <h1>Craftworx Agra</h1>
                <h2>Reset Password</h2>
                <form onSubmit={submitForm}>
                    <div className={styles.passWrap}>
                        <input
                            type={passVisible ? "text" : "password"}
                            placeholder={"New Password"}
                            value={form.pass}
                            onChange={(e) => setForm({ ...form, pass: e.target.value })}
                            required
                        />
                        <i className={passVisible ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => setPassVisible((x) => !x)}></i>
                    </div>
                    <div className={styles.passWrap}>
                        <input
                            type={newPassVisible ? "text" : "password"}
                            placeholder={"Re-enter New Password"}
                            value={form.repass}
                            onChange={(e) => setForm({ ...form, repass: e.target.value })}
                            required
                        />
                        <i className={newPassVisible ? "fas fa-eye-slash" : "fas fa-eye"} onClick={() => setNewPassVisible((x) => !x)}></i>
                    </div>
                    <button type="submit">Reset</button>
                </form>
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
                <p className={styles.error} style={{ opacity: error.length ? 1 : 0 }}>
                    <i className="fas fa-exclamation-circle"></i>&nbsp;{error}
                </p>
            </section>
        </>
    );
};

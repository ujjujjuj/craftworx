import { useState, useMemo, useEffect } from "react";

import styles from "../styles/components/reset.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();

    return useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);
}

export const NewPass = () => {
    const [error, setError] = useState(false);
    const { code } = useQuery();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        pass: "",
        repass: "",
    });

    useEffect(() => {
        if (!code)
            navigate("/")
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        console.log(form.pass);
        console.log(form.repass);
        if (form.pass !== form.repass) {
            setError(true);
            return;
        }
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/reset-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code, password: form.pass, passwordConfirmation: form.repass }),
        })
            .then((res) => res.json())
            .then((dat) => {
                console.log("sucecss");
                console.log(dat);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => { });
    };

    return (
        <>
            <section className={styles.resetSec}>
                <h1>Craftworx Agra</h1>
                <h2>Reset Password</h2>
                <form onSubmit={submitForm}>
                    <input
                        type={"password"}
                        placeholder={"New Password"}
                        value={form.pass}
                        onChange={(e) => setForm({ ...form, pass: e.target.value })}
                        required
                    />
                    <input
                        type={"password"}
                        placeholder={"Re-enter New Password"}
                        value={form.repass}
                        onChange={(e) => setForm({ ...form, repass: e.target.value })}
                        required
                    />
                    <button type="submit">Reset</button>
                </form>
                <p className={styles.error} style={{ opacity: error ? 1 : 0 }}>
                    <i className="fas fa-exclamation-circle"></i>&nbsp;Passwords don't match
                </p>
            </section>
        </>
    );
};

import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/reset.module.css";

export const Reset = () => {
    const [mailSent, setMailSent] = useState(0);
    const user = useSelector((state) => state.authState);
    const [form, setForm] = useState({
        email: "",
    });

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        setMailSent(1);
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/forgot-password/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: form.email }),
        })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setMailSent(2);
            });
    };

    useEffect(() => {
        if (user.isLoggedIn)
            navigate("/shop")
    }, [])

    return (
        <>
            <section className={styles.resetSec}>
                <h1>Craftworx Agra</h1>
                <h2>{!(mailSent === 2) ? "Send Password Reset Link" : `Reset link sent to ${form.email}`}</h2>
                <p>
                    {mailSent === 2
                        ? "Please check your email for the link. Check your spam folder if you don't see it."
                        : "Type in your resgistered email and we'll send you a reset link"}
                </p>
                {mailSent === 2 ? (
                    <button onClick={() => setMailSent(false)}>Go Back</button>
                ) : (
                    <form onSubmit={submitForm} className={mailSent === 1 ? styles.disabled : ""}>
                        <input
                            type={"email"}
                            placeholder={"xyz@abc.com"}
                            value={form.email}
                            onChange={(e) => setForm({ email: e.target.value })}
                            id="email"
                            name="email"
                            required
                        />
                        <button type="submit">Proceed</button>
                    </form>
                )}
                <ThreeDots
                    height="15"
                    width="40"
                    radius="20"
                    color="#54605F"
                    ariaLabel="three-dots-loading"
                    wrapperClassName=""
                    wrapperStyle={{ opacity: mailSent === 1 ? 1 : 0 }}
                    visible={true}
                />
            </section>
        </>
    );
};

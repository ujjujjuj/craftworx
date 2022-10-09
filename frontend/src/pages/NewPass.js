import { useState } from "react"

import styles from "../styles/components/reset.module.css"

export const NewPass = () => {

    const [error, setError] = useState(false)

    const [form, setForm] = useState({
        pass: "",
        repass: ""
    })

    const submitForm = (e) => {
        e.preventDefault();
        if (form.pass != form.repass) {
            setError(true)
        }
    }

    return <>
        <section className={styles.resetSec}>
            <h1>Craftworx Agra</h1>
            <h2>Reset Password</h2>
            <form onSubmit={submitForm} >
                <input type={"password"} placeholder={"New Password"} value={form.pass} onChange={(e) => setForm({ pass: e.target.value })} required />
                <input type={"password"} placeholder={"Re-enter New Password"} value={form.repass} onChange={(e) => setForm({ repass: e.target.value })} required />
                <button type="submit">Reset</button>
            </form>
            <p className={styles.error} style={{ opacity: error ? 1 : 0 }}><i className="fas fa-exclamation-circle"></i>&nbsp;Passwords don't match</p>
        </section>
    </>
}
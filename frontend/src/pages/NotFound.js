import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/404.module.css"
export const NotFound = () => {

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/shop")
        }, 3000);
    })

    return (
        <>
            <section className={styles.main}>
                <div>
                    <h1>404</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <p className={styles.p1}>Redirecting to Shop...</p>
                </div>
            </section>
        </>
    )

}
import { useEffect } from 'react';
import styles from '../styles/components/about.module.css'
const Corporate = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <>
        <div className={styles.aboutHead}>
        <div className={styles.aboutImg}></div>
            <div className={styles.aboutContent}>
                <h3>Want something special and handmade for your business?</h3>
                <p>We create customised handmade products for our customers on special request. Tell us what you want and we will deliver it to you right away. Providing the best in market services to our customers with a smooth and easy process.</p>
            </div>
        </div>
        </>
    );
};

export default Corporate;
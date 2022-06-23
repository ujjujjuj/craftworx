import { useEffect } from 'react';
import styles from '../styles/components/about.module.css'
const Bespoke = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <>
        <div className={styles.aboutHead}>
        <div className={styles.aboutImg}></div>
            <div className={styles.aboutContent}>
                <h3>Customised handmade products specifically for you.</h3>
                <p>We create customised handmade products for our customers on special request. Tell us what you want and we will deliver it to you right away. Providing the best in market services to our customers with a smooth and easy process.</p>
            </div>
        </div>
        </>
    );
};

export default Bespoke;
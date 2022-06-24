import { useEffect } from 'react';
import styles from '../styles/components/about.module.css'
const About = ()=>{
    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);
    return (
        <>
        <div className={styles.aboutHead}>
            <div className={styles.aboutContent}>
                <h3>Handmade products specifically for you.</h3>
                <p>Founded in August 2017 and based in Agra, India, Craftworx Agra is a trusted marketplace for people to find the best gifting products. Total customer satisfaction is the goal of the company. We are equipped with state-of-art logistic facilities to deliver best quality goods to the customers.</p>
            </div>
            <div className={styles.aboutImg}></div>
        </div>
        <div className={styles.founderSec}>
            <div className = {styles.founderImg}></div>
            <div className={styles.founderContent}>
                <h3>Ankita Gupta</h3>
                <p>We strive to offer our customers best quality products at industry competitive prices. We use superior quality packaging material and equipment to ensure safety of the products in transit and delivery. We understand the needs and demands of our customers and offer viable solutions for the same. Our sole aim is to supply a comprehensive range of best products at best prices.</p>
            </div>
        </div>
        </>
    );
};

export default About;
import classNames from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/components/about.module.css'

const Corporate = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        desc: ""
    })
    const [imgLoaded, setImgLoaded] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        const img = new Image();
        img.src = 'https://api.craftworxagra.co.in/uploads/corp_b2e4959f33.jpg'
        img.onload = () => {
            setImgLoaded(true)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Helmet>
                <title>Craftworx | Corporate</title>
            </Helmet>
            <div className={classNames(styles.aboutHead, styles.formAbout)}>
                <div className={classNames(styles.aboutImg, imgLoaded ? styles.corporate : styles.shimmer)} ></div>
                <div className={styles.aboutContent} >
                    <h3>Want something special and handmade for your business?</h3>
                    <p>We offer customised handmade products and services for businesses on special request. Tell us what you want and we will get back to you right away. We take customisation to a whole other level.</p>
                    <div className={styles.userForm}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formHead}>
                                <div className={styles.formInput}>
                                    <label htmlFor="name">Name</label>
                                    <input type={"text"} placeholder="John Doe" id="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} required />
                                </div>
                                <div className={styles.formInput}>
                                    <label htmlFor="email">Email</label>
                                    <input type={"email"} placeholder="abc@xyz.com" id="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} required />
                                </div>
                            </div>
                            <div className={classNames(styles.formInput, styles.textarea)}>
                                <label htmlFor="desc">Describe Your Requirements and we'll get back to you!</label>
                                <textarea type={"text"} rows="20" placeholder="Build me a rocket.." id="desc" value={formState.desc} onChange={(e) => setFormState({ ...formState, desc: e.target.value })} required />
                            </div>
                            <button type='submit'>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Corporate;
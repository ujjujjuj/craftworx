import classNames from 'classnames';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styles from '../styles/components/about.module.css'
const Bespoke = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        desc: ""
    })
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Helmet>
                <title>Craftworx | Bespoke</title>
            </Helmet>
            <div className={classNames(styles.aboutHead, styles.formAbout)}>
                <div className={classNames(styles.aboutImg, styles.bespoke)}></div>
                <div className={styles.aboutContent}>
                    <h3>Customised handmade products specifically for you.</h3>
                    <p>We create customised handmade products for our customers on special request. Tell us what you want and we will deliver it to you right away. Whatever event it is, we know how to make it exceptional.</p>
                    <div className={styles.userForm}>
                        <form>
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

export default Bespoke;
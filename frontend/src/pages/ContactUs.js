import styles from '../styles/components/contact.module.css'
import classnames from "classnames";
import { useEffect } from "react";
import gsap, { Linear, Sine } from "gsap";
import { Helmet } from 'react-helmet'

const ContactUs = () => {
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 });
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" });

        let total = 15, i;
        let container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (i = 0; i < 4; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(0, w * 0.2), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(0, w * 0.2), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot2}` }, x: R(0, w * 0.2), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 4; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}` }, x: R(w * 0.80, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot1}` }, x: R(w * 0.80, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot2}` }, x: R(w * 0.70, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        function animm(elm) {
            gsap.to(elm, R(10, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
            gsap.to(elm, R(4, 8), {
                x: "+=100",
                rotationZ: R(0, 180),
                repeat: -1,
                yoyo: true,
                ease: Sine.easeInOut,
            });
        }

        function R(min, max) {
            return min + Math.random() * (max - min);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        init();
    }, []);
    return (
        <>
            <Helmet>
                <title>Craftworx | Contact Us</title>
            </Helmet>
            <div className={styles.container} id="container"></div>
            <section className={styles.main}>
                <h3>Get in touch with us</h3>
                <div className={styles.formSection}>
                    <form>
                        <div className={styles.formHead}>
                            <div className={styles.inputWrap}>
                                <label htmlFor="name">Name / Business Name</label>
                                <input name='name' id='name' placeholder='Jane Doe Enterprises' />
                            </div>
                            <div className={styles.inputWrap}>
                                <label htmlFor="email">Email</label>
                                <input name='email' type="email" id='email' placeholder='Jane Doe Enterprises' />
                            </div>
                        </div>

                        <div className={classnames(styles.message, styles.inputWrap)}>
                            <label htmlFor="message">Message</label>
                            <textarea name='message' id='message' placeholder='Hi, I would like you to..' rows={12} ></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <div className={styles.spacer}></div>
            </section>
        </>
    );
};

export default ContactUs;
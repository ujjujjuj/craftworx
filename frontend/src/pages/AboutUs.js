import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/about.module.css'
import gsap, { Linear, Sine } from "gsap";
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

const About = () => {
    const [isAnim, setIsAnim] = useState(false);
    const visionRef = useRef();
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 });
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" });

        let total = 15, i;
        let container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (i = 0; i < 2; i++) {
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

    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        document.title = "Craftworx | Contact Us"
        window.scrollTo(0, 0);
        const img = new Image();
        img.src = "../images/aboutUs.png"
        img.onload = () => {
            setImgLoaded(true)
        }
        if (!isAnim) {
            init()
            setIsAnim(true)
        }

    }, []);

    return (
        <>
            <Helmet>
                <title>Craftworx | About</title>
            </Helmet>
            <div className={styles.slider}>
                <section className={classNames(styles.aboutHead, styles.mainAbout)}>
                    <div className={classNames(styles.aboutContent)}>
                        <h3>Handmade products specifically for you.</h3>
                        <p>Craftworx by Ankita Gupta is an Agra based brand, established in 2019, which has taken a pledge to serve you with the best quality products overloaded with top-notch creativity. We are a one stop destination for all kinds of products, goodies, presents and mementos to make a special occasion an extraordinary one. We specialise in crafting customised and personalised products for all kinds of events, be it big or small, casual or formal, traditional or western. A go to gifting solution for all your special days. </p>
                        <p>The range of our customised products and services include, trousseau packaging, engagement ring platters, return favours, baby shower presents, invitations, varied kinds of hampers, pinewood trays and baskets, MDF wooden boxes and a lot more. We create a sense of personalisation in each of our products which speaks a thousand words to the receiver. So far we have gained the trust of 900 plus clients PAN India and eagerly want to add more and more customers to this list.  </p>
                        <div className={styles.scrollIndicator} onClick={() => {
                            visionRef.current.scrollIntoView()
                        }}>
                            <p> Scroll Down</p>
                            <i className="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div className={classNames(styles.aboutImg, imgLoaded ? styles.aboutHeroImg : styles.shimmer)}></div>
                </section>
                <section className={styles.ourVision} ref={visionRef}>
                    <div className={styles.container} id="container"></div>
                    <div className={styles.contentWrap}>
                        <h4>Our Vision</h4>
                        <h2>“To bridge the wide gap of the quality and variety of gifting products available in the market vs what the customers actually look for.”</h2>
                        <p>Craftworx aims to enrich relationships and spread happiness with our high end products. We wish to be a part of all the special events of your life by crafting customised products for you and your loved ones' birthdays, weddings, parties, engagements, anniversaries, festivals, promotions, baby showers and all other special occasions.</p>
                    </div>
                </section>

                <section className={styles.uniqueSec}>
                    <div className={styles.uniqueSecWrap}>
                        <h3>What makes us unique?</h3>
                        <p>We customise themes, packaging styles, colours, hamper sizes, name labels and many other aspects as per your requirements, thereby adding a touch of personalisation to your presents and packages. There is a wide variety of products and customisations that you can choose from. We are known for offering the best quality products made up of top notch raw materials which simply wins hearts. Our delivery partners provide their services all over India so that people from all corners of the nation can get their hands on our creative products.</p>
                    </div>
                    <img src='/images/fl0.svg' alt='flower vector' />
                </section>


                <section className={styles.founderSec}>
                    <div className={styles.founderImg}></div>
                    <div className={styles.founderContent}>
                        <h3>From the Founder's Desk</h3>
                        <p>Welcome to my world. I am <b>Ankita Gupta</b>, a crafting enthusiast. My passion for designing products based on creative concepts pushed me to start my brand which stands for making perfect presents and trousseau packaging. When I embarked upon this beautiful journey, I used to pull all-nighters to complete my orders as I used to work alone but gradually I have built a team of 10+ members and no combination of words is enough to express my gratitude for my wonderful clients. They say that when you do what you love, it doesn't feel like you are working and believe me the feeling is surreal. I pour my heart into my designs and each and every product I create is very close to my heart. My team wishes to delight more and more customers with our exclusive range of hampers, trousseau packing, adorned trays and a lot more other exciting products. </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
import styles from '../styles/components/home.module.css';
import gsap, { Linear, Sine } from "gsap";
import classnames from 'classnames';
import Product from './Product'
import { useEffect } from 'react';
const Home = () => {
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 })
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" })

        var total = 15, i;
        var container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (i = 0; i < total; i++) {
            var Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}`}, x: R(w * 0.3, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 4; i++) {
            var Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.fl1}`}, x: R(w * 0.4, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            var Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.fl2}` }, x: R(w * 0.4, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }
        function animm(elm) {
            gsap.to(elm, R(10, 15), { y: h + 100, ease: Linear.easeNone, repeat: -1, delay: -15 });
            gsap.to(elm, R(4, 8), { x: '+=100', rotationZ: R(0, 180), repeat: -1, yoyo: true, ease: Sine.easeInOut });
        };

        function R(min, max) { return min + Math.random() * (max - min) };
    }
    useEffect(() => {
        init();
    }, []);
    return (
    <>
    <div className={styles.container} id="container">
    </div>
    <div className={styles.main}>
    <div className={styles.hero}>
        <h1>Craftworx Agra</h1>
        <h2>Trousseau,<br/>
            Gift Packing & more
            </h2>
        <p>Love the giver more than the gift, we’ll take care of the rest. Providing you with the best quality of services with premium packaging that will leave everyone awestruck.</p>
        <div className={styles.shopBtn}>
            Shop now
        </div>
    </div>
</div>
<section className={styles.homeSec1}> 
    <div className={styles.title}>
        <p>
            Most Popular
        </p>
        <a href="/shop">View All
        </a>
    </div>
    <div className={styles.popProducts}>
        <Product/>
        <Product/> 
         <Product/>
    </div>
</section>

<section className={classnames(styles.promo,styles.bespoke)}>
    <div className={styles.promoImg}>
    </div>
    <div className={styles.promoContent}>
        <div className={styles.col}>
            <h2>Trousseau,<br/>
                Gift Packing & more
                </h2>
            <p>Love the giver more than the gift, we’ll take care of the rest. Providing you with the best quality of services with premium packaging that will leave everyone awestruck.</p>
            <div className={styles.shopBtn}>
                Shop now
            </div>
        </div>
      
    </div>
</section>
<section className={classnames(styles.promo,styles.corporate)}>
   
<div className={styles.promoContent}>
        <div className={styles.col}>
            <h2>Trousseau,<br/>
                Gift Packing & more
                </h2>
            <p>Love the giver more than the gift, we’ll take care of the rest. Providing you with the best quality of services with premium packaging that will leave everyone awestruck.</p>
            <div className={styles.shopBtn}>
                Shop now
            </div>
        </div>
      
    </div>
    <div className={styles.promoImg}>
    </div>
</section>

    <footer>

    </footer>
    </>
    );
};

export default Home;

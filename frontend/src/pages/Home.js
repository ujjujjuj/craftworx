import styles from "../styles/components/home.module.css";
import gsap, { Linear, Sine } from "gsap";
import classnames from "classnames";
import Product from "./Product";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../styles/components/swiper.css'
import UserTestimonial from "../components/userTestimonial";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const init = () => {
        gsap.set(`${styles.container}`, { perspective: 600 });
        gsap.set("img", { xPercent: "-50%", yPercent: "-50%" });

        let total = 15, i;
        let container = document.getElementById("container"), w = window.innerWidth, h = window.innerHeight;

        for (i = 0; i < total; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.dot}`}, x: R(w * 0.4, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 4; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.fl1}`}, x: R(w * 0.4, w), y: R(-200, -150), z: R(-200, 200) });
            container.appendChild(Div);
            animm(Div);
        }

        for (i = 0; i < 2; i++) {
            let Div = document.createElement('div');
            gsap.set(Div, { attr: { class: `${styles.fl2}` }, x: R(w * 0.4, w), y: R(-200, -150), z: R(-200, 200) });
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
    const [popProducts,setPopProducts] =useState([]);
    useEffect(() => {
        window.scrollTo(0,0);
        init();
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount&populate=images`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            let products = data.data.map((obj) => ({ id: obj.id, ...obj.attributes }));
            if(products.length>3)
            setPopProducts(products.slice(0,3));
            else
            setPopProducts(products)
        });
    }, []);
    return (
        <>
            <div className={styles.container} id="container"></div>
            <div className={styles.main}>
                <div className={styles.hero}>
                    <h1>Craftworx Agra</h1>
                    <h2>
                        Trousseau,
                        <br />
                        Gift Packing & more
                    </h2>
                    <p>
                        Love the giver more than the gift, we'll take care of the rest. Providing
                        you with the best quality of services with premium packaging that will leave
                        everyone awestruck.
                    </p>
                    <div className={styles.shopBtn} onClick={()=>{navigate('/shop')}}>Shop now</div>
                </div>
            </div>
            <section className={styles.homeSec1}>
                <div className={styles.title}>
                    <p>Most Popular</p>
                    <a href="/shop">View All</a>
                </div>
                <div className={styles.popProducts}>
                    {popProducts.length===0?
                     <><Product shimmer="true"/>
                     <Product shimmer="true"/>
                     <Product shimmer="true"/>
                     {window.innerWidth>1650?                
                         <Product shimmer="true"/>:<></>
                     }
                     </>:
                     popProducts.map((product) => (
                        <Product key={product.id} shimmer={false} product={product} />
                    ))}

                </div>
            </section>

            <section className={classnames(styles.promo, styles.bespoke)}>
                <div className={styles.promoImg}></div>
                <div className={styles.promoContent}>
                    <div className={styles.col}>
                        <h2>
                            Trousseau,
                            <br />
                            Gift Packing & more
                        </h2>
                        <p>
                            Love the giver more than the gift, we'll take care of the rest.
                            Providing you with the best quality of services with premium packaging
                            that will leave everyone awestruck.
                        </p>
                        <div className={styles.shopBtn}>Shop now</div>
                    </div>
                </div>
            </section>
            <div className="swiper-wrap">
            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            pagination={{
            
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation,Autoplay]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
            <SwiperSlide>
                <UserTestimonial ></UserTestimonial>
            </SwiperSlide>
            <SwiperSlide>                
                <UserTestimonial></UserTestimonial>
            </SwiperSlide>
            <SwiperSlide>                
                <UserTestimonial></UserTestimonial>
            </SwiperSlide>
            <SwiperSlide>                
                <UserTestimonial></UserTestimonial>
            </SwiperSlide>
            </Swiper>
            </div>
           
        </>
    );
};

export default Home;

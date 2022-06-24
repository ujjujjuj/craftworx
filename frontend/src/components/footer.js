import React from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import styles from "../styles/components/footer.module.css";
const Footer = ()=>{
    const location = useLocation();
    const [email,setEmail] = React.useState('');
    return(
        <>
            <footer className={location.pathname.includes("checkout")?styles.hide:styles.show}>
                <div className={styles.footContent}>
                    <Link to='/'><h1>Craftworx Agra</h1></Link>
                    <div className={styles.socialWrap}>
                       <a href='https://instagram.com/craftworxagraa?igshid=YmMyMTA2M2Y=' target='_blank' rel="noreferrer"><i className="fab fa-instagram"></i></a>
                       <a href='https://m.facebook.com/craftworxagra/' target='_blank' rel="noreferrer"><i className="fab fa-facebook-square"></i></a>
                       <a href='https://wa.me/message/WZSNB6BWFW6XO1' target='_blank' rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
                    </div> 
                    <div className={styles.mailWrap}>
                        <img src="../images/mail.svg" alt="mail-icon"/>
                        <a href="mailto:contact@craftworx.co.in">craftworxagra@gmail.com</a> 
                    </div>
                    <div className={styles.mailWrap}>
                        <i className="fas fa-phone-alt"></i>
                        <a href="tel:+919548888716">+91 9548888716</a> 
                    </div>
                    <div className={classnames(styles.mailWrap,styles.address)}>
                        <i className="fas fa-map-marker-alt"></i>
                        <p>E-195 Kamla Nagar, <br/>Agra, Uttar Pradesh - 282005</p>
                    </div>
                    
                </div>
                <div className={styles.listWrap}>
                        <ul>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/shop'><li>Shop</li></Link>
                        <Link to='/bespoke'><li>Bespoke</li></Link>
                        <Link to='/corporate'><li>Corporate</li></Link>
                        <Link to='/about'><li>About Us</li></Link>
                        </ul>
                        <ul>
                        <Link to='/contact'><li>Contact Us</li></Link>
                            <Link to='/privacy'><li>Privacy Policy</li></Link>
                            <Link to='/terms'><li>Terms of Service</li></Link>
                            <Link to='/returnpolicy'><li>Refund Policy</li></Link>

                        </ul>
                    </div>
                <div className={styles.footContent}>
                    <h3>Subsribe to our Newsletter</h3>
                    <div className={styles.emailWrap}>
                    <img src="../images/black-mail.svg" width={20} alt="mail-icon"/>
                    <input type="email" placeholder="Enter E-mail Address" value={email} onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    </div>
                    <button>Submit</button>
                    <div className={styles.bottom}>
                    Craftworx Agra © 2022 All Right Reserved &nbsp; <img width={23} src="../images/up-icon.svg" alt="up-icon" onClick={()=>{
                        window.scrollTo(0,0);
                    }}/>

                    </div>

                </div>
            </footer>
        </>
    );
};

export default Footer;
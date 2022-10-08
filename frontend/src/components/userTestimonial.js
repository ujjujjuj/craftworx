import styles from "../styles/components/home.module.css";

const UserTestimonial = ({ content = "Our clients and partners, alike love us. It is our commitment to the highest standards of service that enthralls our Clients – most of whom have been with us, once they sign-up. We work with our partners, on the supply side, creating a truly win-win situation. Our endeavor is to support them to delight their clients, in various Employee Learning Development Processes.", imgUrl, name = "Naman Dureja", desig = "" }) => {
    return (
        <>
            <div className={styles.userTestimonial}>
                <p style={{ fontStyle: "italic" }}>
                    "{content}"
                </p>
                <div className={styles.userWrap}>
                    <p>- {name}, {desig}</p>
                </div>
                <div className={styles.triangle}></div>
            </div>
        </>
    );
}

export default UserTestimonial;
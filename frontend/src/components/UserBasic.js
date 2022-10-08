import styles from "../styles/components/user.module.css"

export const UserBasicElem = ({userName="Ishaan Das",userImage="/images/product-placeholder.png"})=>{
    return (
        <>
        <div className={styles.basicElem}>
                <div className={styles.userImg} style={{backgroundImage:`url(${userImage})`}}></div>
                <p>{userName}</p>
        </div>
        </>
    )
}

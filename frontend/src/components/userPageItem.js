import styles from "../styles/components/user.module.css"

export const UserPageItem = ({Child,index,addresses})=>{
    return (<>
        <div className={styles.userItem}>
            <Child addresses={addresses}/>
            <img src="/images/edit_icon.svg" alt="edit icon" className={index===0?styles.center:""} />
        </div>
    </>)
}
import styles from "../styles/components/user.module.css"

export const UserPageItem = ({Child,addresses,popState})=>{
    return (<>
        <div className={styles.userItem}>
            <Child addresses={addresses} popState={popState}/>
        </div>
    </>)
}
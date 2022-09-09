import styles1 from "../styles/components/checkout.module.css";
import classnames from "classnames";
import styles from "../styles/components/cart.module.css";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'


const Popup = ({line, posHandler,sub_line, negHandler, posLabel, negLabel}) => {
    return (
        <>
            <div
                className={classnames(styles.modal, styles.visible)}
            ></div>
            <div className={classnames(styles1.popup,line.includes("Success")?styles1.successPop:"")}>
                <div className={styles1.popUpMsg}>
                   <p>{line}</p>
                   <p>
                    {sub_line}
                    </p>
                </div>

               {line.includes("Success")?<>
               <ThreeDots 
                    height="20" 
                    width="50" 
                    radius="9"
                    color="#54605F" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                    />
               </>:<div className={styles1.buttonWrap}>
                    <div
                        className={styles1.button}
                        onClick={posHandler}
                    >
                        {posLabel}
                    </div>
                    <div
                        className={classnames(styles1.popupAlt)}
                        onClick={negHandler}
                    >
                        {negLabel}
                    </div>
                </div>}
            </div>
        
        </>
    )
}

export default Popup;
import {useState} from 'react';
import styles from '../styles/components/cart.module.css'

const CartItem = ()=>{
    const [qty,setQty] = useState(1);
    return <>
      <div className={styles.cartItem}>
            <div className={styles.cartImg}></div>
            <div className={styles.itemDet}>
                <p>Trousseau Packaging</p>
                <small>$430</small>
                <div className={styles.qtyWrap}>
                    <div className={styles.alter} onClick={()=>{
                        setQty((prev)=>prev+1)
                    }} 
                    ><i class="fas fa-plus"></i></div>
                    <input type="number" min={"1"} value={qty} onChange={(e)=>{
                        setQty(e.target.value)
                        if(e.target.value<1){
                            setQty("")
                        }
                    }}
                    onBlur={()=>{
                        if(!(qty>0))
                        setQty(1)
                    }}
                        ></input>
                    <div className={styles.alter} onClick={()=>{
                        setQty((prev)=>prev>1?prev-1:1)
                    }}><i class="fas fa-minus"></i></div>
                </div>
            </div>
            <div className={styles.delete}>
            <i class="far fa-trash-alt"></i>
            </div>
        </div>
    </>
};

export default CartItem;
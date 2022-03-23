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
                    }}><i class="fas fa-plus"></i></div>
                    <input type="number" min={"1"} value={qty}></input>
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
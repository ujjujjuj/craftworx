import styles1 from '../styles/components/cart.module.css';
import styles from '../styles/components/home.module.css';

import { useState } from 'react';

const AddToCart = () => {
    const [qty, setQty] = useState(0);

    return (
        <>
            {qty>0?
             <div className={styles1.qtyWrap}>
             <div className={styles1.alter} onClick={() => {
                 setQty((prev) => prev + 1)
             }}><i class="fas fa-plus"></i></div>
             <input type="number" min={"1"} value={qty}></input>
             <div className={styles1.alter} onClick={() => {

                 setQty((prev) => prev - 1)
             }}><i class="fas fa-minus"></i></div>
         </div>:    
        
            <div className={styles.addToCart} onClick={
              ()=>  setQty(1)
            }>
                <img src="/images/cart.svg" alt="" />
                &nbsp;&nbsp; Add to cart
            </div>
}
        </>
    );
}

export default AddToCart;
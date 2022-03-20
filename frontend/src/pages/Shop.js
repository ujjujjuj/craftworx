import styles from '../styles/components/shop.module.css';
import Product from './Product'
import classnames from 'classnames';
import React from 'react';

const Shop = () => {
    const [dropState, setDropState] = React.useState(false);

    const dropDown = ()=>{
        setDropState(!dropState);
        
    };


    return (<>
    <div className={styles.main}>
    <div class={styles.header}>
        <div class={styles.searchBox}>
            <input type="text" name="search" id="search" placeholder="Search"/>
            <img src="/images/search.svg"/>
        </div>
        <div class={styles.sort} onClick={dropDown}>
          <p unselectable='on' >Sort By: <span id="sort-label">Relevance</span> </p> 
            <ul className={classnames(styles.dropList,dropState&&styles.ulExpanded)}>
                <li className={styles.selected} id="sort-1">Relevance</li>
                <li id="sort-2">Price: Low to High</li>
                <li id="sort-3">Price: High to Low</li>
                <li id="sort-4">Newest Arrivals</li>
            </ul>
            <img src="/images/drop.svg" className={dropState?styles.rotate:""} alt=""/>
        </div>
    </div>
    <div className={styles.filter}>
        <p className={styles.active}>All</p>
        <p>Gifts</p>
        <p>Trousseau</p>
        <p>Festive Ocassion</p>
    </div>
</div>

<section className={styles.products}>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
        <Product/>
</section>
    </>);
}

export default Shop
import styles from "../styles/components/product.module.css";
import classnames from "classnames";
import styles1 from "../styles/components/home.module.css";
import AddToCart from "../components/addToCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./Product";
import { Link } from "react-router-dom";
import classNames from "classnames";
const qs = require('qs');
const ProductShow = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [imgArray, setImgArray] = useState([]);
    const [isPopVisible,setPopVisible] = useState(true)
    const [prodQty, setProdQty] = useState(1);
    const [mainImg, setMain] = useState('');
    const [relatedArray, setRelated] = useState([]);
    useEffect(() => {
        window.scrollTo(0,0)
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/products/${id}?fields=*&populate=images`)
            .then((res) => res.json())
            .then((data) => {
                setProduct({
                    id: data.data.id,
                    ...data.data.attributes
                });
                setImgArray(data.data.attributes.images.data.map((e, n) => {
                    return {
                        url: e.attributes.url,
                        active: n === 0 ? true : false
                    }
                }))
                setMain(data.data.attributes.images.data[0].attributes.url)
                const query = qs.stringify({
                    filters: {
                        category: {
                            $eq: data.data.attributes.category,
                        },
                    },
                }, {
                    encodeValuesOnly: true,
                });
                fetch(`${process.env.REACT_APP_SERVER_URL}/api/products?${query}&fields=name,price,category&populate=images`).then((res) => res.json()).then((data1) => {
                    console.log(data1.data.length)
                    if(data1.data.length===1){
                        setPopVisible(false)
                    }
                    setRelated(data1.data.map((obj) => ({ id: obj.id, ...obj.attributes })).filter(obj => {
                        if (obj.id !== data.data.id)
                            return true
                        else
                            return false
                    }));
                })
            });
    }, [id]);

    let productFinalAmt =Math.floor((product.price-(product.discount*product.price/100))).toFixed(2)



    const smallClick = (e) => {
        let current = e.target.dataset.url
        let index = e.target.dataset.index
        setMain(current)
        let items = [...imgArray];
        items.forEach(e => {
            e.active = false
        })
        let item = { ...imgArray[index], active: true }
        items[index] = item;
        setImgArray(items)
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.gallery}>
                    <div className={styles.mainImg} style={{ backgroundImage: `url('${mainImg?.length ? process.env.REACT_APP_SERVER_URL + mainImg : ""}')` }}>
                    </div>
                    <div className={styles.imgList}>
                        {
                            imgArray.map((e, n) => {
                                return <div alt="small" key={n} data-url={e.url} data-index={n} onClick={(e) => { smallClick(e) }} className={classNames(styles.smallImg, e.active ? styles.selected : "")} style={{ backgroundImage: `url('${process.env.REACT_APP_SERVER_URL + e.url}')` }}></div>
                            })
                        }
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.heading}>
                        <h1>{product.name}</h1>
                        <Link to="/shop">Back to shop</Link>
                    </div>
                    <div className={styles.rating}>
                        <img src="/images/star.svg" alt="Rating star" />
                        <img src="/images/star.svg" alt="Rating star" />
                        <img src="/images/star.svg" alt="Rating star" />
                        <img src="/images/star.svg" alt="Rating star" />
                        <p>42 Reviews</p>
                    </div>
                    <div className={styles.cost}>
                        {product.discount > 0 ? <> <h1 className={styles.slash}>₹ {product.price.toFixed(2)}</h1>
                        </> : <></>}
                        <div className={styles.discWrap}>
                            <h1>₹ {product.price?productFinalAmt:"100" }</h1>   {product.discount > 0 ? <p>{product.discount}% off</p> : <></>}

                        </div>

                    </div>
                    <p className={styles.desc}>
                        {product.description}
                    </p>
                    <div className={styles.foot}>
                        <div className="styles.qtyWrap">
                            <p>Quantity</p>
                            <div className={styles.qtyWrap}>
                                <div className={styles.alter} onClick={(e) => {
                                    setProdQty((prodQty - 1) > 0 ? (prodQty - 1) : 1)
                                }} >
                                    <i className="fas fa-minus"></i>
                                </div>
                                <input
                                    type="number"
                                    value={prodQty}
                                    readOnly
                                ></input>
                                <div className={styles.alter} onClick={(e) => {
                                    setProdQty(prodQty + 1)
                                }}>
                                    <i className="fas fa-plus"></i>
                                </div>
                            </div>
                        </div>
                        <AddToCart ctx="pView" qty={prodQty} product={product} />
                    </div>
                </div>
            </div>
            <section className={classnames(styles1.homeSec1,!isPopVisible?styles1.hidden:"")}>
                <div className={styles1.title}>
                    <p>More products like this</p>
                    <a href="/shop">View All</a>
                </div>
                <div className={styles1.popProducts} >
                    {relatedArray.length===0?<>
                        <Product shimmer="true"/>
                        <Product shimmer="true"/>
                        <Product shimmer="true"/>
                        {window.innerWidth>1650?                
                    <Product shimmer="true"/>:<></>
                }
                    </>:
                    relatedArray.map((obj) => {
                        return <Product key={obj.id} product={obj} />
                    })}
                </div>
            </section>
        </>
    );
};

export default ProductShow;
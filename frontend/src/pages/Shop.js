import styles from "../styles/components/shop.module.css";
import Product from "./Product";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getProducts } from "../api/products";
import useWindowDimensions from "../hooks/windowDimensions";
import OutsideAlerter from "../components/outsideClickDiv";
import { NotFound } from "../components/NotFound";
import useAnalyticsEventTracker from "../api/useAnalyticsEventTracker";
import { gtag } from "ga-gtag";

const dropdownOptions = [
    {
        text: "Popularity",
        sortTag: "count%3Adesc",
    },
    {
        text: "Price: Low to High",
        sortTag: "price%3Aasc",
    },
    {
        text: "Price: High to Low",
        sortTag: "price%3Adesc"
    },
    {
        text: "Newest Arrivals",
        sortTag: "createdAt%3Adesc",
    },
];

const categories = [{
    id: -1,
    name: "All"
}];

const getCateg = (x) => {
    return {
        id: x.id,
        name: x.attributes.name
    }
}

const sortCateg = (a, b) => {
    var textA = a.name.toUpperCase();
    var textB = b.name.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
};

const Shop = () => {
    const [init, setInit] = useState(true);
    const [categs, setCategs] = useState(categories);
    const [searchParams] = useSearchParams();
    const [dropState, setDropState] = useState(false);
    const [catDropState, setCatDropState] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: searchParams.get("q") || "",
        dropdownSelection: 0
    });
    const products = useRef([]);
    const [pgNo, setPgNo] = useState(1);
    const [totPages, setTotPages] = useState(0);
    const [cat, setCat] = useState(0);
    const firstUpdate = useRef(true);
    const updateProducts = (data) => {
        window.scrollTo(0, 0);
        products.current = data.data.map((obj) => ({ id: obj.id, ...obj.attributes }));
        setFilteredProducts(products.current);
        // applyFilters();
        setTotPages(data.meta.pagination.pageCount);
        setInit(false);
    }
    const { width } = useWindowDimensions();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch("https://api.craftworxagra.co.in/api/categories").then((res) => res.json()).then((data) => {
            setCategs([...categories, ...data.data.map((x) => getCateg(x)).sort(sortCateg)])
        })
    }, []);

    useEffect(() => {
        setFilteredProducts([])
        setInit(true)
        getProducts(pgNo, categs[cat].id, updateProducts, width < 1650 ? 21 : 24, dropdownOptions[filters.dropdownSelection].sortTag, filters.searchQuery)
    }, [pgNo, filters.dropdownSelection]);

    useEffect(() => {

        let timer;
        const srch = () => {
            setFilteredProducts([])
            setInit(true)
            getProducts(pgNo, categs[cat].id, updateProducts, width < 1650 ? 21 : 24, dropdownOptions[filters.dropdownSelection].sortTag, filters.searchQuery)
            gtag("event", "search")
            gtag('get', 'G-6BEMP9ZBY2', 'client_id', (clientId) => {
                fetch('https://api.craftworxagra.co.in/api/measurement-protocol/collect', {
                    method: 'POST',
                    body: JSON.stringify({
                        client_id: clientId,
                        events: [{
                            "name": "search",
                            "params": {
                                "search_term": filters.searchQuery
                            }
                        }]
                    })
                })
            });
        }
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else if (filters.searchQuery === "") {
            srch()
        } else {
            timer = setTimeout(() => {
                srch()
            }, 600);
        }
        return () => clearTimeout(timer)

    }, [filters.searchQuery]);

    const search = () => {
        setFilteredProducts([])
        setInit(true)
        getProducts(pgNo, categs[cat].id, updateProducts, width < 1650 ? 21 : 24, dropdownOptions[filters.dropdownSelection].sortTag, filters.searchQuery)
        gtag("event", "search")
        gtag('get', 'G-6BEMP9ZBY2', 'client_id', (clientId) => {
            fetch('https://api.craftworxagra.co.in/api/measurement-protocol/collect', {
                method: 'POST',
                body: JSON.stringify({
                    client_id: clientId,
                    events: [{
                        "name": "search",
                        "params": {
                            "search_term": filters.searchQuery
                        }
                    }]
                })
            })
        });
    }

    useEffect(() => {
        if (filteredProducts.length === 0) {
            window.scrollTo(0, 0);
        }
    }, [filteredProducts])

    useEffect(() => {
        setFilters({ ...filters, searchQuery: searchParams.get("q") || "" });
    }, [searchParams]);



    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            setFilteredProducts([])
            setInit(true)
            setPgNo(1)
            getProducts(1, categs[cat].id, updateProducts, width < 1650 ? 21 : 24, dropdownOptions[filters.dropdownSelection].sortTag, filters.searchQuery);
        }
    }, [cat])

    const gaEventTracker = useAnalyticsEventTracker("Shop")
    return (
        <>
            <Helmet>
                <title>Craftworx | Shop</title>
            </Helmet>
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search"
                            value={filters.searchQuery}
                            onChange={(e) =>
                                setFilters((_filters) => ({
                                    ..._filters,
                                    searchQuery: e.target.value,
                                }))
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    search()
                                }
                            }}
                        />
                        <img src="/images/search.svg" alt="search" onClick={search} />
                        <div className={styles.suggestion}>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                        </div>
                    </div>
                    <OutsideAlerter state={() => { setCatDropState(false) }} className={classnames(styles.sort, styles.categ)} onClick={() => { setCatDropState((x) => !x); setDropState(false); }}>
                        <p unselectable="on">
                            Category: <span id="sort-label">{categs[cat].name}</span>{" "}
                        </p>
                        <ul className={classnames(styles.dropList, catDropState ? styles.ulExpanded : "")}>
                            {categs.map((categ, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        gaEventTracker("Category", categ.name)
                                        setCat(index);
                                    }}
                                    className={index === cat ? styles.selected : ""}
                                >
                                    {categ.name}
                                </li>
                            ))}
                        </ul>
                        <img src="/images/drop.svg" className={catDropState ? styles.rotate : ""} alt="" />
                    </OutsideAlerter>
                    <OutsideAlerter state={() => { setDropState(false) }} className={styles.sort} onClick={() => { setDropState((x) => !x); setCatDropState(false); }}>
                        <p unselectable="on">
                            Sort By: <span id="sort-label">{dropdownOptions[filters.dropdownSelection].text}</span>{" "}
                        </p>
                        <ul className={classnames(styles.dropList, dropState ? styles.ulExpanded : "")}>
                            {dropdownOptions.map((dropdownOption, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        setFilters((_filters) => ({
                                            ..._filters,
                                            dropdownSelection: index,
                                        }))
                                    }
                                    className={index === filters.dropdownSelection ? styles.selected : ""}
                                >
                                    {dropdownOption.text}
                                </li>
                            ))}
                        </ul>
                        <img src="/images/drop.svg" className={dropState ? styles.rotate : ""} alt="" />
                    </OutsideAlerter>
                </div>
            </div>
            {
                filteredProducts.length === 0 && init === false ? <NotFound></NotFound> : ""
            }
            <section className={classnames(styles.products, styles.shopPage)}>
                {filteredProducts.length === 0 && init === true ? (
                    <>
                        <Product shimmer="true" />
                        <Product shimmer="true" />
                        <Product shimmer="true" />
                        {window.innerWidth >= 1650 ? <Product shimmer="true" /> : <></>}
                    </>
                ) : (
                    filteredProducts.map((product) => <Product key={product.id} shimmer={false} product={product} />)
                )}
            </section>
            {totPages ?
                <div className={styles.pagination}>
                    <i className="fa-solid fa-angle-left" onClick={() => {
                        if (pgNo > 1)
                            setPgNo((cur) => cur - 1)
                    }} style={{ opacity: pgNo === 1 ? 0.4 : 1, cursor: pgNo === 1 ? "auto" : "pointer" }}></i>

                    <div className={styles.pages}>
                        {
                            totPages < 5 ?
                                Array.from({ length: totPages }, (_, i) => i + 1).map((x, n) => {
                                    return <div key={n} className={classnames(styles.page, x === pgNo ? styles.active : "")} onClick={
                                        () => {
                                            setPgNo(x)
                                        }
                                    }>
                                        {x}
                                    </div>;
                                }) :
                                pgNo < 4 ? [...(pgNo === 3 ? [1, 2, 3, 4] : [1, 2, 3]).map((x, n) => {
                                    return <div key={n} className={classnames(styles.page, x === pgNo ? styles.active : "")} onClick={
                                        () => {
                                            setPgNo(x)
                                        }
                                    }>
                                        {x}
                                    </div>;
                                }), <div key={-1} className={classnames(styles.page)}>...</div>, <div key={totPages} className={classnames(styles.page)} onClick={
                                    () => {
                                        setPgNo(totPages)
                                    }
                                }>
                                    {totPages}
                                </div>] : pgNo > (totPages - 3) ? [<div key={0} className={classnames(styles.page)} onClick={
                                    () => {
                                        setPgNo(1)
                                    }
                                }>
                                    {1}
                                </div>,
                                <div key={-1} className={classnames(styles.page)}>...</div>,
                                Array.from({ length: 3 }, (_, i) => i + totPages - 2).map((x, n) => {
                                    return <div key={n} className={classnames(styles.page, x === pgNo ? styles.active : "")} onClick={
                                        () => {
                                            setPgNo(x)
                                        }
                                    }>
                                        {x}
                                    </div>;
                                })] : [
                                    <div key={0} className={classnames(styles.page)} onClick={
                                        () => {
                                            setPgNo(1)
                                        }
                                    }>
                                        {1}
                                    </div>, <div key={-1} className={classnames(styles.page)}>...</div>,
                                    Array.from({ length: 3 }, (_, i) => i + pgNo - 1).map((x, n) => {
                                        console.log(x)
                                        return <div key={n} className={classnames(styles.page, x === pgNo ? styles.active : "")} onClick={
                                            () => {
                                                setPgNo(x)
                                            }
                                        }>
                                            {x}
                                        </div>;
                                    }), <div key={-2} className={classnames(styles.page)}>...</div>,
                                    <div key={totPages} className={classnames(styles.page)} onClick={
                                        () => {
                                            setPgNo(totPages)
                                        }
                                    }>
                                        {totPages}
                                    </div>
                                ]
                        }
                    </div>
                    <i className="fa-solid fa-angle-right" onClick={() => {
                        if (pgNo < totPages)
                            setPgNo((cur) => cur + 1)
                    }}
                        style={{ opacity: pgNo === totPages ? 0.4 : 1, cursor: pgNo === totPages ? "auto" : "pointer" }}
                    ></i>
                </div> : <></>}
        </>
    );
};

export default Shop;

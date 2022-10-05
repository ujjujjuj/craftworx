import styles from "../styles/components/shop.module.css";
import Product from "./Product";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const dropdownOptions = [
    {
        text: "Relevance",
        func: (arr) => arr,
    },
    {
        text: "Price: Low to High",
        func: (arr) => {
            arr.sort((a, b) => (a.price < b.price ? -1 : 1));
            return arr;
        },
    },
    {
        text: "Price: High to Low",
        func: (arr) => {
            arr.sort((a, b) => (a.price > b.price ? -1 : 1));
            return arr;
        },
    },
    {
        text: "Newest Arrivals",
        func: (arr) => arr,
    },
];

const categories = ["All", "MDF Boards/Boxes", "Pinewood", "Tissue Box"];

const Shop = () => {
    const [init, setInit] = useState(true);
    const [searchParams] = useSearchParams();
    const [dropState, setDropState] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: searchParams.get("q") || "",
        dropdownSelection: 0,
        categorySelection: 0,
    });
    const products = useRef([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount,weight,material,length,breadth,height&populate=images&pagination[page]=1&pagination[pageSize]=999`
        )
            .then((res) => res.json())
            .then((data) => {
                products.current = data.data.map((obj) => ({ id: obj.id, ...obj.attributes }));
                setFilteredProducts(products.current);
                applyFilters();
                setInit(false);
            });
    }, []);

    useEffect(() => {
        setFilters({ ...filters, searchQuery: searchParams.get("q") || "" });
    }, [searchParams]);

    const applyFilters = () => {
        let filtered = products.current;
        filtered = dropdownOptions[filters.dropdownSelection].func(filtered);
        filtered = filtered.filter(
            (prod) => filters.categorySelection === 0 || prod.category === categories[filters.categorySelection]
        );
        filtered = filtered.filter((prod) => prod.name.toLowerCase().includes(filters.searchQuery.toLowerCase()));

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

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
                        />
                        <img src="/images/search.svg" alt="search" />
                        <div className={styles.suggestion}>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                            <p>Lorem Ipsum ipsum ipsum ipsum ipsum </p>
                        </div>
                    </div>
                    <div className={styles.sort} onClick={() => setDropState((x) => !x)}>
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
                    </div>
                </div>
                <div className={styles.filter}>
                    {categories.map((_category, index) => (
                        <p
                            className={index === filters.categorySelection ? styles.active : ""}
                            onClick={() =>
                                setFilters((_filters) => ({
                                    ..._filters,
                                    categorySelection: index,
                                }))
                            }
                            key={index}
                        >
                            {_category}
                        </p>
                    ))}
                </div>
            </div>

            <section className={classnames(styles.products, styles.shopPage)}>
                {filteredProducts.length === 0 && init === true ? (
                    <>
                        <Product shimmer="true" />
                        <Product shimmer="true" />
                        <Product shimmer="true" />
                        {window.innerWidth > 1650 ? <Product shimmer="true" /> : <></>}
                    </>
                ) : (
                    filteredProducts.map((product) => <Product key={product.id} shimmer={false} product={product} />)
                )}
            </section>
        </>
    );
};

export default Shop;

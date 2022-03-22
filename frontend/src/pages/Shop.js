import styles from "../styles/components/shop.module.css";
import Product from "./Product";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";

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

const categories = ["All", "Gifts", "Trousseau", "Festive Occation"];

const productsTemp = Array(5)
    .fill({ name: "ishaan das mom", price: 30000, category: "Trousseau" })
    .concat(Array(4).fill({ name: "cock", price: 99900, category: "Gifts" }))
    .map((a, i) => ({ ...a, key: i }));

const Shop = () => {
    const [dropState, setDropState] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        searchQuery: "",
        dropdownSelection: 0,
        categorySelection: 0,
    });
    const products = useRef([]);

    useEffect(() => {
        // TODO : api call
        products.current = productsTemp;
        setFilteredProducts(products.current);
    }, []);

    useEffect(() => {
        let filtered = products.current;
        filtered = dropdownOptions[filters.dropdownSelection].func(filtered);
        filtered = filtered.filter(
            (prod) =>
                filters.categorySelection === 0 ||
                prod.category === categories[filters.categorySelection]
        );
        filtered = filtered.filter((prod) =>
            prod.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );

        setFilteredProducts(filtered);
    }, [filters]);

    return (
        <>
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
                        <img src="/images/search.svg" />
                    </div>
                    <div className={styles.sort} onClick={() => setDropState((x) => !x)}>
                        <p unselectable="on">
                            Sort By:{" "}
                            <span id="sort-label">
                                {dropdownOptions[filters.dropdownSelection].text}
                            </span>{" "}
                        </p>
                        <ul className={classnames(styles.dropList, dropState && styles.ulExpanded)}>
                            {dropdownOptions.map((dropdownOption, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        setFilters((_filters) => ({
                                            ..._filters,
                                            dropdownSelection: index,
                                        }))
                                    }
                                    className={
                                        index === filters.dropdownSelection && styles.selected
                                    }
                                >
                                    {dropdownOption.text}
                                </li>
                            ))}
                        </ul>
                        <img
                            src="/images/drop.svg"
                            className={dropState ? styles.rotate : ""}
                            alt=""
                        />
                    </div>
                </div>
                <div className={styles.filter}>
                    {categories.map((_category, index) => (
                        <p
                            className={index === filters.categorySelection && styles.active}
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
                    {/* <p className={styles.active}>All</p>
                    <p>Gifts</p>
                    <p>Trousseau</p>
                    <p>Festive Ocassion</p> */}
                </div>
            </div>

            <section className={styles.products}>
                {filteredProducts.map((product, index) => (
                    <Product key={product.key} name={product.name} price={product.price} />
                ))}
            </section>
        </>
    );
};

export default Shop;

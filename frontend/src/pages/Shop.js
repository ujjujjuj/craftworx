import styles from "../styles/components/shop.module.css";
import Product from "./Product";
import classnames from "classnames";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

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

// const productsTemp = Array(5)
//     .fill({ name: "ishaan das mom", price: 300, category: "Trousseau" })
//     .concat(Array(4).fill({ name: "cock", price: 999, category: "Gifts" }))
//     .map((a, i) => ({ ...a, id: i }));

const Shop = () => {
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
        // TODO : api call
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category`)
            .then((res) => res.json())
            .then((data) => {
                products.current = data.data.map((obj) => ({ id: obj.id, ...obj.attributes }));
                setFilteredProducts(products.current);
                applyFilters();
            });

        // products.current = productsTemp;
        // setFilteredProducts(products.current);
    }, []);

    useEffect(() => {
        setFilters({ ...filters, searchQuery: searchParams.get("q") || "" });
    }, [searchParams]);

    const applyFilters = () => {
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
    };

    useEffect(() => {
        applyFilters();
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
                        <img src="/images/search.svg" alt="search" />
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
                </div>
            </div>

            <section className={styles.products}>
                {filteredProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </section>
        </>
    );
};

export default Shop;

const getProducts = (pgNo, callback) => {
    fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount&populate=images&pagination[page]=${pgNo}&pagination[pageSize]=30`
    ).then((res) => res.json()).then((data) => {
        callback(data)
    });

}

export { getProducts };
const getProducts = (pgNo, categID, callback) => {
    console.log(categID)
    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount,weight,material,length,breadth,height&populate=images&pagination[page]=${pgNo}&pagination[pageSize]=21`
    if (categID !== -1)
        fetchUrl = `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount,weight,material,length,breadth,height&populate=images&pagination[page]=${pgNo}&pagination[pageSize]=21&filters[prod_categories][id][$eq]=${categID}`

    console.log(fetchUrl)
    fetch(fetchUrl).then((res) => res.json()).then((data) => {
        callback(data)
    });


}

export { getProducts };
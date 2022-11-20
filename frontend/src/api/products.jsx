
const getProducts = (pgNo, categID, callback, size, sort, search) => {

    let fetchUrl = `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount,weight,material,length,breadth,height&populate=images&pagination[page]=${pgNo}&pagination[pageSize]=${size}&sort=${sort}`
    if (categID !== -1)
        fetchUrl = `${process.env.REACT_APP_SERVER_URL}/api/products?fields=name,price,category,discount,weight,material,length,breadth,height&populate=images&pagination[page]=${pgNo}&pagination[pageSize]=${size}&filters[prod_categories][id][$eq]=${categID}&sort=${sort}`

    if (search && search.length) {
        fetchUrl += `&filters[name][$containsi]=${search}`
    }

    fetch(fetchUrl).then((res) => res.json()).then((data) => {
        callback(data)
    });


}

export { getProducts };
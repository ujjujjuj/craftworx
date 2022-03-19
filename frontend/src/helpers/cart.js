export const addToCart = (item) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...oldCart, item]));
};

export const getCart = () => {
    return JSON.stringify(localStorage.getItem("cart")) || [];
};

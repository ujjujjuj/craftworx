const updateUserDb = async (user, token, id) => {
    let req = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    });
    let res = await req.json();
    return res;
}


const updateAddress = async (user, token, address) => {
    let req = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/address/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    });
    let res = await req.json();
    return res;
}



export default updateUserDb; 
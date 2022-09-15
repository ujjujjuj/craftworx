const fetchOrder = async (user, userPayInfo, checkoutCart, shippingOptions) => {
    let req = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.jwt}`,
        },
        body: JSON.stringify({
            info: userPayInfo,
            cart: checkoutCart,
            shipping: shippingOptions.data[shippingOptions.currentSelected].id,
        }),
    });
    let res = await req.json();
    console.log(res);
    return res;
};

const confirmOrder = async (response) => {
    let req = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/confirm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
    });
    let res = await req.json();
    return res;
};

const initRazorPay = (order, userPayInfo, success, dismiss, failed) => {
    const options = {
        key: process.env.REACT_APP_RAZORPAY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Craftworx",
        description: "Craftworx transaction",
        order_id: order.id,
        handler: (response) => {
            success(response, order);
        },
        prefill: {
            name: `${userPayInfo.fName} ${userPayInfo.lName}`,
            email: `${userPayInfo.email}`,
            contact: `${userPayInfo.phnNo}`,
        },
        notes: {
            address: userPayInfo.zipcode,
        },
        theme: {
            color: "#000000",
        },
        modal: {
            ondismiss: function () {
                dismiss();
            },
        },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
        failed(response);
    });
    razorpay.open();
};

export { fetchOrder, initRazorPay, confirmOrder };

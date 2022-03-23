const Checkout = () => {
    // const Razorpay = useRazorpay();
    const createOrder = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/new`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 1: 3 }),
        })
            .then((res) => res.json())
            .then((data) => {
                const options = {
                    key: process.env.RECAT_APP_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
                    amount: "30000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Craftworx",
                    description: "Craftworx transaction",
                    order_id: data.id, 
                    handler: (response) => {
                        fetch(`${process.env.REACT_APP_SERVER_URL}/api/orders/confirm`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(response),
                        })
                        alert("success!");
                    },
                    prefill: {
                        name: "Ujjwal Dimri",
                        email: "ujjwaldimri123@gmail.com",
                        contact: "9599580229"
                    },
                    notes: {
                        address: "Gurgaon",
                    },
                    theme: {
                        color: "#000000",
                    },
                };
                const razorpay = new window.Razorpay(options);
                razorpay.on("payment.failed", (response) => {
                    
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                razorpay.open();
            });
    };
    return (
        <div>
            <button onClick={createOrder} style={{marginTop:"100px"}}>Checkout</button>
        </div>
    );
};

export default Checkout;

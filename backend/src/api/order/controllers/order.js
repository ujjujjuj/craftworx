const axios = require("axios");
const { v4: uuidv4, NIL: NIL_UUID } = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { promisify } = require("util");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const getShiprocketToken = (() => {
  let shipRocketToken = null;
  const setShiprocketToken = async () => {
    let req = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }
    );
    shipRocketToken = req.data.token;
  };
  setShiprocketToken();
  setInterval(() => {
    setShiprocketToken();
  }, 1000 * 60 * 60 * 24 * 9);

  return () => shipRocketToken;
})();

const getShiprocketOptions = async (pinCode, weight) => {
  let params = {
    pickup_postcode: "282005",
    delivery_postcode: pinCode,
    cod: 0,
    weight,
  };
  return await axios
    .get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability?" +
        new URLSearchParams(params),
      {
        headers: {
          Authorization: `Bearer ${getShiprocketToken()}`,
        },
      }
    )
    .then((res) => {
      return { error: false, ...res.data };
    })
    .catch((err) => {
      return { error: true, ...err.response.data };
    });
};
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async get(ctx) {
    if (!ctx.request.query?.id) return;
    const order = await strapi.db
      .query("api::order.order")
      .findOne({ where: { orderId: ctx.request.query.id } });
    if (order === null) return;

    let products = await strapi.db.query("api::product.product").findMany({
      where: {
        $or: Object.keys(order.items).map((id) => {
          return { id };
        }),
      },
      populate: {
        images: true,
      },
    });

    const cart = Object.keys(order.items).map((item) => ({
      ...products.find((prod) => prod.id === parseInt(item)),
      qty: order.items[item],
    }));
    ctx.body = { order, cart };
  },
  async getAll(ctx) {
    if (!ctx.request.query?.email) return;
    const orders = await strapi.db.query("api::order.order").findMany({
      where: { userEmail: ctx.request.query.email },
      orderBy: { createdAt: "DESC" },
    });
    if (orders === null) return;
    let orderDets = [];
    for await (const order of orders) {
      let products = await strapi.db.query("api::product.product").findMany({
        where: {
          $or: Object.keys(order.items).map((id) => {
            return { id };
          }),
        },
        populate: {
          images: true,
        },
      });
      const cart = Object.keys(order.items).map((item) => ({
        ...products.find((prod) => prod.id === parseInt(item)),
        qty: order.items[item],
      }));

      orderDets.push({
        order,
        cart,
      });
    }
    ctx.body = orderDets;
  },
  async create(ctx) {
    let products = await strapi.db.query("api::product.product").findMany({
      where: {
        $or: Object.keys(ctx.request.body.cart).map((id) => {
          return { id };
        }),
      },
    });

    let totalPrice = Number(
      (
        (products.reduce(
          (prev, next) =>
            prev +
            ctx.request.body.cart[next.id] *
              next.price *
              (1 - next.discount / 100),
          0
        ) *
          1.18) /
        100
      ).toFixed(2)
    );

    const totalWeight =
      products.reduce(
        (prev, next) => prev + ctx.request.body.cart[next.id] * next.weight,
        0
      ) / 1000;

    const shipOptions = await getShiprocketOptions(
      ctx.request.body.info.zipcode,
      totalWeight
    );

    const selectedShipOption =
      shipOptions.data.available_courier_companies.filter(
        (company) => company.id === ctx.request.body.shipping
      )[0];

    totalPrice += Math.ceil(selectedShipOption.rate);

    let userId = null;
    if (ctx.request.header.authorization) {
      try {
        user = await strapi.plugins["users-permissions"].services.jwt.getToken(
          ctx
        );
        userId = user.id;
      } catch (err) {}
    }

    const entry = await strapi.db.query("api::order.order").create({
      data: {
        transactionId: uuidv4(),
        items: ctx.request.body.cart,
        isConfirmed: false,
        userId,
        userEmail: ctx.request.body.info.email,
        userInfo: ctx.request.body.info,
        amount: Math.floor(totalPrice * 100),
        shipping: Math.ceil(selectedShipOption.rate * 100),
      },
    });

    const options = {
      amount: Math.floor(totalPrice * 100),
      currency: "INR",
      receipt: entry.transactionId,
    };

    const createdOrder = await promisify(razorpay.orders.create)(options);
    strapi.db.query("api::order.order").update({
      where: { id: entry.id },
      data: {
        orderId: createdOrder.id,
      },
    });

    ctx.body = createdOrder;
  },

  async confirm(ctx) {
    console.log(ctx.request.body);
    const hash = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(
        ctx.request.body.razorpay_order_id +
          "|" +
          ctx.request.body.razorpay_payment_id
      )
      .digest("hex");

    console.log(hash);
    if (hash === ctx.request.body.razorpay_signature) {
      ctx.body = { error: false };
      const order = await strapi.db
        .query("api::order.order")
        .findOne({ where: { orderId: ctx.request.body.razorpay_order_id } });
      console.log(order);
      let products = await strapi.db.query("api::product.product").findMany({
        where: {
          $or: Object.keys(order.items).map((id) => {
            return { id };
          }),
        },
      });
      console.log(products);
      const info = order.userInfo;
      let shipres = await axios
        .post(
          "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
          {
            order_id: order.id.toString(),
            order_date: new Date().toISOString().split("T")[0],
            pickup_location: "Primary",
            billing_customer_name: info.fName,
            billing_last_name: info.lName,
            billing_city: info.city,
            billing_address: info.address,
            billing_pincode: info.zipcode,
            billing_state: info.state,
            billing_country: info.country,
            billing_email: info.email,
            billing_phone: info.phnNo,
            shipping_is_billing: true,
            order_items: products.map((prod) => ({
              sku: prod.id,
              name: prod.name,
              units: order.items[prod.id],
              selling_price: (prod.price * 1.18) / 100,
            })),
            payment_method: "Prepaid",
            shipping_charges: order.shipping / 100,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            sub_total: order.amount / 100,
            length: products.reduce(
              (prev, next) => prev + order.items[next.id] * next.length,
              0
            ),
            breadth: products.reduce(
              (prev, next) => prev + order.items[next.id] * next.breadth,
              0
            ),
            height: products.reduce(
              (prev, next) => prev + order.items[next.id] * next.height,
              0
            ),
            weight:
              products.reduce(
                (prev, next) => prev + order.items[next.id] * next.weight,
                0
              ) / 1000,
          },
          {
            headers: {
              Authorization: `Bearer ${getShiprocketToken()}`,
            },
          }
        )
        .catch((e) => {
          console.log(JSON.stringify(e.response.data, null, 2));
          throw "nigga";
        });
      console.log(JSON.stringify(shipres.data, null, 2));
      await strapi.db.query("api::order.order").update({
        where: { orderId: ctx.request.body.razorpay_order_id },
        data: {
          isConfirmed: true,
          shiprockeId: shipres.data.order_id,
          shipmentId: shipres.data.shipment_id,
        },
      });
      strapi
        .plugin("email")
        .service("email")
        .send({
          to: info.email,
          from: "admin@craftworxagra.co.in",
          subject: "Order Successfully Placed at CratworxAgra",
          text: "hello you have ordered the the",
          html: "<b>hi<b> is this working",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      ctx.body = { error: true };
    }
  },

  async getShipOptions(ctx) {
    let res = await getShiprocketOptions(
      ctx.request.body.delivery_postcode,
      ctx.request.body.weight / 1000
    );

    ctx.body = res;
  },

  async invoice(ctx) {
    const res = await axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/print/invoice",
        {
          ids: [ctx.request.body.id],
        },
        {
          headers: {
            Authorization: `Bearer ${getShiprocketToken()}`,
          },
        }
      )
      .catch((e) => {
        console.log(e);
        throw "nigga";
      });
    ctx.body = { invoice: res.data.invoice_url };
  },
}));

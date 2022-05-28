const axios = require("axios");
const { v4: uuidv4, NIL: NIL_UUID } = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { promisify } = require("util");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// im higH lmao
module.exports = {
  async create(ctx) {
    console.log(ctx.request.body);
    let totalPrice = 0;
    for (let productId in ctx.request.body.cart) {
      let product = await strapi.db
        .query("api::product.product")
        .findOne({ where: { id: parseInt(productId) } });
      console.log(product);
      totalPrice += product.price * ctx.request.body.cart[productId];
    }
    const tax = Math.round((totalPrice * 18) / 100);
    totalPrice += tax;
    let userId = null;
    if (ctx.request.header.authorization) {
      try {
        const user = await strapi.plugins[
          "users-permissions"
        ].services.jwt.getToken(ctx);
        userId = user.id;
      } catch (err) {}
    }
    // ctx.body = { error: false };
    // return;
    const entry = await strapi.db.query("api::order.order").create({
      data: {
        transactionId: uuidv4(),
        items: ctx.request.body.cart,
        isConfirmed: false,
        userId,
        userInfo: ctx.request.body.info,
        amount: totalPrice,
      },
    });
    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: entry.transactionId,
    };

    const createdOrder = await promisify(razorpay.orders.create)(options);
    console.log(createdOrder);
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
      strapi.db.query("api::order.order").update({
        where: { orderId: ctx.request.body.razorpay_order_id },
        data: {
          isConfirmed: true,
        },
      });
    } else {
      ctx.body = { error: true };
    }
  },
};

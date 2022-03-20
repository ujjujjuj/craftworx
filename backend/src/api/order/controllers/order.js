const axios = require("axios");
const { v4: uuidv4, NIL: NIL_UUID } = require("uuid");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

module.exports = {
  async create(ctx) {
    console.log(ctx.request.body);
    const entry = await strapi.db.query("api::order.order").create({
      data: {
        transactionId: uuidv4(),
        items: ctx.request.body,
        isConfirmed: false,
      },
    });
    const options = {
      amount: 30000,
      currency: "INR",
      receipt: entry.transactionId,
    };

    return new Promise((resolve, reject) => {
      razorpay.orders.create(options, (err, order) => {
        if (err) {
          return reject(err);
        }
        console.log(order);
        strapi.db.query("api::order.order").update({
          where: { id: entry.id },
          data: {
            orderId: order.id,
          },
        });
        ctx.body = order;
        resolve();
      });
    });
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

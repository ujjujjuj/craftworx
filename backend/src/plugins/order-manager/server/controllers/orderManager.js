"use strict";

module.exports = {
  index(ctx) {
    console.log("asdad");
    console.log(ctx.state);
    ctx.body = { hello: "world" };
  },
  async fetchOrders(ctx) {
    const orders = await strapi.db.query("api::order.order").findMany();
    ctx.body = orders;
  },
};

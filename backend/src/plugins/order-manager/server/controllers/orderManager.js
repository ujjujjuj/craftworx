"use strict";

module.exports = {
  index(ctx) {
    console.log("asdad");
    console.log(ctx.state);
    ctx.body = { hello: "world" };
  },
  async getOrders(ctx) {
    const orders = await strapi.db.query("api::order.order").findMany();
    ctx.body = orders;
  },
  async getProducts(ctx) {
    console.log(ctx.request.body);
    const items = await strapi.db.query("api::product.product").findMany({
      where: {
        id: {
          $in: ctx.request.body.productIds,
        },
      },
    });
    ctx.body = items;
  },
};

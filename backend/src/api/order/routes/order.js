module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/get",
      handler: "order.get",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/orders/new",
      handler: "order.create",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/orders/confirm",
      handler: "order.confirm",
      config: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/orders/getShipOptions",
      handler: "order.getShipOptions",
      config: {
        auth: false,
      },
    },
  ],
};

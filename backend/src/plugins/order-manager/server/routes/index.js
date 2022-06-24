module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "orderManager.index",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/getOrders",
    handler: "orderManager.getOrders",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/getProducts",
    handler: "orderManager.getProducts",
    config: {
      auth: false,
      policies: [],
    },
  },
];

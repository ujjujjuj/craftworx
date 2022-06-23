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
    handler: "orderManager.fetchOrders",
    config: {
      auth: false,
      policies: [],
    },
  },
];

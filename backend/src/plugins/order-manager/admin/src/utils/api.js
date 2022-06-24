// ./admin/src/utils/api.js
import { __esModule } from "@strapi/design-system/TextInput.development";
import { request } from "@strapi/helper-plugin";
import pluginId from "../pluginId";

export const getOrders = async () => {
  try {
    const data = await request(`/${pluginId}/getOrders`, { method: "GET" });
    return data;
  } catch (error) {
    return null;
  }
};

export const getProducts = async (ids) => {
  try {
    const data = await request(`/${pluginId}/getProducts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productIds: ids }),
    });
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

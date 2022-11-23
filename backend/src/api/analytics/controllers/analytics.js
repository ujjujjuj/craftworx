'use strict';

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::analytics.analytics", ({ strapi }) => ({

    send(ctx) {
        const payload = ctx.request.body;

        fetch(`https://www.google-analytics.com/mp/collect?measurement_id=G-SC82Z7RD6Y&api_secret=ucjKJE3CTYmHEk1WGYsjdQ`, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        // if (!payload.client_id) {
        //     return ctx.badRequest('client_id is required');
        // }
        // if (!payload.events || !Array.isArray(payload.events)) {
        //     return ctx.badRequest('events are required');
        // }

        // strapi
        //     .plugin('measurement-protocol')
        //     .service('gtag')
        //     .send({
        //         user_id: ctx?.state?.user?.id,
        //         ...payload,
        //     });

        return 'OK';
    },
}));

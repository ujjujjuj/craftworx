module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/analytics/collect',
            handler: 'analytics.send',
            config: {
                auth: false,
                policies: [],
            },
        }
    ],

};

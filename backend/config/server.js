module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  url: env("SERVER_URL")||"http://localhost:1337",
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});

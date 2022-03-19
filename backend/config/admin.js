module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8ed071a05707afe84374b5bcf4f0e61e'),
  },
});

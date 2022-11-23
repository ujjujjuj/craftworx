module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env("SMTP_PORT", 465),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: "admin@craftworxagra.com",
        defaultReplyTo: "admin@craftworxagra.com",
      },
    },
  },
  "measurement-protocol": {
    config: {
      apiSecret: 'ucjKJE3CTYmHEk1WGYsjdQ',
      measurementId: 'G-SC82Z7RD6Y',
      useValidationServer: false,
    }
  }
});

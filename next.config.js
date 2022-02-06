module.exports = {
  future: {
    webpack5: false,
  },
  env: {
    API_URL: process.env.API_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
}
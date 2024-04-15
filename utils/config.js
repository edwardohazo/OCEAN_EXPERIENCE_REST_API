import dotenv from 'dotenv';

dotenv.config({ path: `../.env` })

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PAYPAL_API_CLIENT: process.env.PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET: process.env.PAYPAL_API_SECRET,
  PAYPAL_API: process.env.PAYPAL_API,
  BRAINTREE_ACCESSTOKEN: process.env.BRAINTREE_ACCESSTOKEN
};
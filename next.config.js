/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    stripeKey:
      'sk_test_51MAewqAimYsCeNwXoVLP63zvnfu8Qatj2CgdeJlxSPmZfjqaMDRd9pn0RzO5psArSLiz7w3ENfukLujcoK6wxoIx00MeXSACjI',
    stripeEndpoint: 'https://stripe.com/docs/api/tokens/create_card',
  },
};

module.exports = nextConfig;

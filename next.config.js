const nextConfig = {
  reactStrictMode: true,
  env: {
    STRIPE_KEY:
      'sk_test_51MAewqAimYsCeNwXoVLP63zvnfu8Qatj2CgdeJlxSPmZfjqaMDRd9pn0RzO5psArSLiz7w3ENfukLujcoK6wxoIx00MeXSACjI', //Don't think this is in the best place as its committed to the repo, local env file isn't working
  },
};

module.exports = nextConfig;

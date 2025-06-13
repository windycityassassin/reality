module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: require.resolve("path-browserify"),
          url: require.resolve("url"),
          util: require.resolve("util/"),
          stream: require.resolve("stream-browserify"),
          buffer: require.resolve("buffer/"),
          crypto: require.resolve("crypto-browserify"),
        },
      },
    },
  },
};

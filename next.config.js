const path = require('path');

module.exports = {
  experimental: {
    pageDataCollectionTimeout: 10000
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}

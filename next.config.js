const path = require('path');

module.exports = {
  experimental: {
    pageDataCollectionTimeout: 10000
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  env: {
    MONGO_URI: process.env.NODE_ENV !== 'development' ? 'mongodb+srv://passDB1:MikaeL2304@take2.yadiv.gcp.mongodb.net/Athena' : "mongodb://localhost:27017/Athena",
    MONGODB_DB: "Athena",
    JWT_SECRET: "a0b16720-b910-4ec7-b511-0bef3e008a14"
  }
}

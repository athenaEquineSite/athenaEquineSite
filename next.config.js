const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },
  env: {
    MONGO_URI: "mongodb://localhost:27017/Athena",
    MONGODB_DB: "Athena",
    JWT_SECRET: "a0b16720-b910-4ec7-b511-0bef3e008a14"
  }
}

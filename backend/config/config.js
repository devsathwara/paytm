const dotenv = require("dotenv");

dotenv.config();
const config = {
  env: {
    app: {
      port: process.env.PORT,
      dbUrl: process.env.DB_URL,
      jwtSecretKey: process.env.SECRET,
      expiresIn: process.env.EXPIRESIN,
      cookieExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  },
};

module.exports = config;

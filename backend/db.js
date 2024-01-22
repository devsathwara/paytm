const mongoose = require("mongoose");
const config = require("./config/config");
mongoose.connect(config.env.app.dbUrl).then(() => {
  console.log("Database Connected");
});

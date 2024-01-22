const express = require("express");
const { userRoutes, accountRoutes } = require("./routes/index");
const cors = require("cors");
const app = express();
const db = require("./db");
const config = require("./config/config");

app.use(cors());
app.use(express.json());
app.use("/api/vi/user", userRoutes);
app.use("/api/vi/account", accountRoutes);
app.listen(config.env.app.port, () => {
  console.log(`Server is running at http://localhost:8080`);
});

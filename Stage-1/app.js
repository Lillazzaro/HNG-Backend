const express = require("express");
require("dotenv").config();

const helloRoutes = require("./router/route.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("trust proxy", true);

app.use("/api/hello", helloRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

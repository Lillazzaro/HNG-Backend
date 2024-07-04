const express = require("express");
const router = express.Router();
const { greet } = require("../controllers/appController.js");

router.get("/", greet);

module.exports = router;

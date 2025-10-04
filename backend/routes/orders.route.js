const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder } = require("../controllers/orders.controller");

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);

module.exports = router;

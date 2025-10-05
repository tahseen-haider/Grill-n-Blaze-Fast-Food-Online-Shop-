const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, deleteOrder } = require("../controllers/orders.controller");

const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, getMyOrders);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;

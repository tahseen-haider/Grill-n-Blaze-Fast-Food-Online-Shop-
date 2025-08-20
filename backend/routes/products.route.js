const express = require("express");
const CartItem = require("../models/CartItem");

const router = express.Router();

// GET all cart items
router.get("/cart", async (req, res) => {
  try {
    const items = await CartItem.find({}); // if using native MongoDB driver
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

router.post("/addToCart", async (req, res) => {
  const item = req.body;
  const { id, title, price, rating } = item;
  await CartItem.insertOne({
    id,
    title,
    price,
    rating,
  });
});

module.exports = router;

const express = require("express");
const CartItem = require("../models/CartItem");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is authenticated

const router = express.Router();

/**
 * ✅ Get all cart items for the logged-in user
 */
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ userId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

/**
 * ✅ Add item to cart (or increase quantity if it already exists)
 */
router.post("/cart/addToCart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, price, image, rating, quantity } = req.body;

    let item = await CartItem.findOne({ userId, productId });

    if (item) {
      // If item already exists, increment quantity
      item.quantity += quantity || 1;
      await item.save();
    } else {
      // Otherwise, create a new cart item
      item = await CartItem.create({
        userId,
        productId,
        title,
        price,
        image,
        rating,
        quantity: quantity || 1,
      });
    }

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Item already exists in cart" });
    }
    res.status(500).json({ message: "Error adding item to cart" });
  }
});

/**
 * ✅ Update item quantity
 */
router.put("/cart/update/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    const item = await CartItem.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating cart item" });
  }
});

/**
 * ✅ Remove item from cart
 */
router.delete("/cart/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const item = await CartItem.findOneAndDelete({ userId, productId });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing cart item" });
  }
});

module.exports = router;

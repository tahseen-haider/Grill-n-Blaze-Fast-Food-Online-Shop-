const express = require("express");
const CartItem = require("../models/CartItem");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET all cart items for the logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await CartItem.find({ userId });
    return res.json(items);
  } catch (err) {
    console.error("Fetch Cart Error:", err);
    return res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

/**
 * Add an item to the cart
 */
router.post("/addToCart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, price, rating, image, quantity = 1 } = req.body;
    
    if (!productId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Check if item already exists for the user
    let cartItem = await CartItem.findOne({ productId, userId });
    
    if (cartItem) {
      // If item exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Add new item
      cartItem = await CartItem.create({
        productId,
        userId,
        title,
        price,
        rating,
        quantity,
        image
      });
    }

    return res.status(201).json({ msg: "Item added to cart", cartItem });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    return res.status(500).json({ error: "Failed to add item to cart" });
  }
});

/**
 * Remove an item from the cart
 */
router.delete("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const deletedItem = await CartItem.findOneAndDelete({ _id: id, userId });
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    return res.json({ msg: "Item removed from cart" });
  } catch (err) {
    console.error("Remove Cart Item Error:", err);
    return res.status(500).json({ error: "Failed to remove item" });
  }
});

/**
 * Clear all items in the cart for the user
 */
router.delete("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await CartItem.deleteMany({ userId });
    return res.json({ msg: "Cart cleared" });
  } catch (err) {
    console.error("Clear Cart Error:", err);
    return res.status(500).json({ error: "Failed to clear cart" });
  }
});

module.exports = router;

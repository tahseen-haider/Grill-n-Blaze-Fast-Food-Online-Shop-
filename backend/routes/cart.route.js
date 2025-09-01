const express = require("express");
const CartItem = require("../models/CartItem");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET /api/cart
 * Get all cart items for the logged-in user
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
 * POST /api/cart/add
 * Add an item to the cart or increment quantity if exists
 */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, title, price, rating, image, quantity = 1 } = req.body;

    if (!productId || !title || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let cartItem = await CartItem.findOne({ productId, userId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        productId,
        userId,
        title,
        price,
        rating,
        image,
        quantity,
      });
    }

    return res.status(201).json({ msg: "Item added to cart", cartItem });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    return res.status(500).json({ error: "Failed to add item to cart" });
  }
});

/**
 * PUT /api/cart/update/:id
 * Update quantity of a specific cart item
 */
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    const updatedItem = await CartItem.findOneAndUpdate(
      { _id: id, userId },
      { quantity },
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    return res.json({ msg: "Cart item updated", updatedItem });
  } catch (err) {
    console.error("Update Cart Item Error:", err);
    return res.status(500).json({ error: "Failed to update item" });
  }
});

/**
 * DELETE /api/cart/:id
 * Remove a single item from the cart
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const deletedItem = await CartItem.findOneAndDelete({ _id: id, userId });
  if (!deletedItem) return res.status(404).json({ error: "Item not found" });
  return res.json({ msg: "Item removed from cart", id: deletedItem._id });
});

/**
 * DELETE /api/cart
 * Clear all items in the user's cart
 */
router.delete("/", authMiddleware, async (req, res) => {
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

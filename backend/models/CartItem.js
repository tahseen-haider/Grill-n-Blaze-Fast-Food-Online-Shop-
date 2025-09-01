const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true }, // product reference (instead of id for clarity)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Ensure unique product per user
cartItemSchema.index({ productId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("CartItem", cartItemSchema);

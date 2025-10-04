import Stripe from "stripe";
import Order from "../models/Order.js";
import CartItem from "../models/CartItem.js"; // ✅ import added

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- PLACE ORDER ---
export const placeOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      cartItems,
      totalPrice,
      paymentMethod,
    } = req.body;

    const userId = req.user?.id; // from auth middleware

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Create order
    const newOrder = await Order.create({
      user: userId || null,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      cartItems,
      totalPrice,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "initiated",
    });

    // --- STRIPE CHECKOUT ---
    if (paymentMethod === "online") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: "pkr",
            product_data: { name: item.title },
            unit_amount: item.price * 100, // in paisa
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/checkout`,
        metadata: { orderId: newOrder._id.toString(), userId },
      });

      newOrder.stripeSessionId = session.id;
      await newOrder.save();

      return res.json({ stripeUrl: session.url });
    }

    // --- COD ---
    if (paymentMethod === "cod" && userId) {
      await CartItem.deleteMany({ userId }); // ✅ delete user's cart
    }

    return res.json({
      success: true,
      message: "Order placed successfully (COD)",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

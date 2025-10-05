import Stripe from "stripe";
import Order from "../models/Order.js";
import CartItem from "../models/CartItem.js"; // ✅ import added

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --- GET MY ORDERS ---
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in first.",
      });
    }

    // Fetch user's orders, most recent first
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        orders: [],
        message: "No orders found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

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

// --- DELETE ORDER ---
export const deleteOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orderId = req.params.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or you are not authorized to delete it",
      });
    }

    // Optionally restrict cancellation to pending orders only:
    if (order.status === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered orders cannot be canceled.",
      });
    }

    await Order.deleteOne({ _id: orderId });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting order.",
    });
  }
};

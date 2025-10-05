import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/cartItemsSlice";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/orders/place-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            cartItems,
            totalPrice,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Failed to place order: ${data.message || "Server error"}`);
        return;
      }

      // ✅ COD Redirect
      if (formData.paymentMethod === "cod") {
        dispatch(fetchCartItems()); // ✅ refetch cart after clearing on server
        navigate("/orders");
      }

      // 💳 Stripe Redirect
      else if (formData.paymentMethod === "online" && data?.stripeUrl) {
        window.location.href = data.stripeUrl;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "50px" }}>
      <Container>
        <h2 className="mb-4 text-center fw-bold">Checkout</h2>

        <Row>
          {/* Left: Address Form */}
          <Col lg={7} md={12} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="mb-3 fw-semibold">Shipping Details</h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="03XX-XXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      rows={2}
                      placeholder="Street, House No., etc."
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="Your city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          placeholder="ZIP / Postal Code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="mt-4 fw-semibold">Payment Method</h5>
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery (COD)"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Online Payment (Stripe)"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleChange}
                    className="mb-3"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 fw-semibold"
                    disabled={cartItems.length === 0 || loading}
                  >
                    {loading
                      ? "Placing Order..."
                      : cartItems.length === 0
                      ? "No Item in Cart"
                      : "Place Order"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right: Cart Items */}
          <Col lg={5} md={12}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="mb-3 fw-semibold">Your Order</h5>

                {cartItems.length > 0 ? (
                  <>
                    <div
                      style={{
                        maxHeight: "300px",
                        overflowY: "auto",
                        borderBottom: "1px solid #eee",
                        marginBottom: "10px",
                      }}
                    >
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="d-flex align-items-center justify-content-between mb-3"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="rounded me-2"
                              style={{
                                width: "55px",
                                height: "55px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <div className="fw-semibold">{item.title}</div>
                              <small className="text-muted">
                                {item.price}/- x {item.quantity}
                              </small>
                            </div>
                          </div>
                          <div className="fw-semibold">
                            Rs. {item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>Rs. {totalPrice}/-</span>
                    </div>

                    <div className="text-center mt-3">
                      <Link to="/" className="text-decoration-none">
                        ← Back to Home
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-muted">Your cart is empty.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

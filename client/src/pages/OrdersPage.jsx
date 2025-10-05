import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/orders/my-orders`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("❌ Could not load your orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Failed to delete: ${data.message || "Server error"}`);
        return;
      }

      // ✅ Remove from local list instantly
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "50px" }}>
      <Container>
        <h2 className="mb-4 text-center fw-bold">My Orders</h2>

        {orders.length === 0 ? (
          <div className="text-center">
            <p className="text-muted mb-3">
              You have not placed any orders yet.
            </p>
            <Link to="/" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col md={6} lg={4} key={order._id} className="mb-4">
                <Card className="shadow-sm border-0 h-100">
                  <Card.Body>
                    <h6 className="fw-bold mb-2">Order ID: {order._id}</h6>
                    <p className="mb-1 text-muted">
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mb-1 text-muted">
                      <strong>Payment:</strong>{" "}
                      {order.paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"}
                    </p>
                    <p className="mb-3 text-muted">
                      <strong>Status:</strong>{" "}
                      <span
                        className={`fw-semibold ${
                          order.status === "Delivered"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </p>

                    <div
                      style={{
                        height: "150px",
                        overflowY: "auto",
                        borderTop: "1px solid #eee",
                        borderBottom: "1px solid #eee",
                        padding: "10px 0",
                        marginBottom: "10px",
                      }}
                    >
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="d-flex align-items-center justify-content-between mb-2 px-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="rounded me-2"
                              style={{
                                width: "45px",
                                height: "45px",
                                objectFit: "cover",
                              }}
                            />
                            <div>
                              <div className="fw-semibold small">
                                {item.title}
                              </div>
                              <small className="text-muted">
                                {item.price}/- × {item.quantity}
                              </small>
                            </div>
                          </div>
                          <div className="fw-semibold small">
                            Rs. {item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total:</span>
                      <span>Rs. {order.totalPrice}/-</span>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="fw-semibold"
                      onClick={() => handleDelete(order._id)}
                    >
                      Cancel Order
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

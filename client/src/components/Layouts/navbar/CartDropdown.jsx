import { useSelector } from "react-redux";

export default function CartDropdown() {
  const cartItems = useSelector((state) => state.cartItems.items);

  // Calculate totals
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="dropdown cart-dropdown">
      {/* Cart Icon Button */}
      <button
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="border-0 bg-transparent p-0 d-flex justify-content-center align-items-center"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
        }}
      >
        <div className="cart position-relative">
          <i className="bi bi-cart2 fs-5" />
          <em
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.7rem" }}
          >
            {totalItems}
          </em>
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className="dropdown-menu dropdown-menu-end shadow-lg mt-2 p-0"
        style={{ width: "300px" }}
      >
        {cartItems.length > 0 ? (
          <>
            {/* Scrollable List */}
            <div
              style={{
                maxHeight: "250px",
                overflowY: "auto",
                padding: "10px",
              }}
            >
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="dropdown-item d-flex align-items-center justify-content-between py-2"
                >
                  {/* Left: Image + Info */}
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
                      <div className="fw-semibold">{item.title}</div>
                      <small className="text-muted">
                        {item.price}/- x {item.quantity}
                      </small>
                      <div>
                        <span className="badge bg-light text-dark border">
                          {item.rating} ★
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Remove Button */}
                  <button
                    className="btn btn-sm p-0 border-0"
                    style={{ lineHeight: 1 }}
                  >
                    <img
                      src="/icons/trash.svg"
                      alt="Remove"
                      style={{ width: "18px", height: "18px" }}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Fixed Footer Section */}
            <div
              style={{
                borderTop: "1px solid #ddd",
                padding: "10px",
                backgroundColor: "#fff",
              }}
            >
              <div className="d-flex justify-content-between fw-semibold mb-2">
                <span>Total:</span>
                <span>{totalPrice}/-</span>
              </div>
              <button className="dropdown-item bg-primary text-white rounded text-center fw-bold">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="dropdown-item text-center text-muted p-3">
            Your cart is empty
          </div>
        )}
      </div>
    </div>
  );
}

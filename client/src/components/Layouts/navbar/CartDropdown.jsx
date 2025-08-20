import { useSelector } from "react-redux";
import "../../../styles/CartDropdown.css";
export default function CartDropdown() {
  const cartItems = useSelector((state) => state.cartItems.items);
  return (
    <div className="dropdown cart-dropdown">
      {/* Image as the toggle button */}
      <button
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className="border-0 bg-transparent p-0" // removes Bootstrap button styles
      >
        <div className="cart">
          <i className="bi bi-cart2" />
          <em className="roundpoint">{cartItems?.length || 0}</em>
        </div>
      </button>

      {/* Dropdown menu */}
      <ul
        className="dropdown-menu dropdown-menu-end shadow-lg"
      >
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                className="dropdown-item d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    className="rounded me-2"
                  />
                  <div>
                    <div className="fw-semibold">{item.title}</div>
                    <small className="text-muted">{item.price}/-</small>
                  </div>
                  <button></button>
                </div>
                <span className="badge bg-secondary">{item.rating}★</span>
              </li>
            ))}

            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item bg-primary text-white rounded">
                Checkout
              </button>
            </li>
          </>
        ) : (
          <li className="dropdown-item text-center text-muted">
            Your cart is empty
          </li>
        )}
      </ul>
    </div>
  );
}

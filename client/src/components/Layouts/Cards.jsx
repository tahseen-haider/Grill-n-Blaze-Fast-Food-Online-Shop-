/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/cartItemsSlice";

export default function Cards({
  id,
  image,
  rating,
  title,
  paragraph,
  price,
  renderRatingIcons,
}) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const item = { id, image, title, price, rating, quantity: 1 };
    dispatch(addToCart(item));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId: id,
            title,
            price,
            rating,
            image,
            quantity: 1,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add item");

      // ✅ Fetch updated cart from backend after successful POST
      dispatch(fetchCartItems());
    } catch (error) {
      console.error(error);
      // Optional: rollback optimistic update if needed
    }
  };

  return (
    <Col sm={6} lg={4} xl={3}>
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item-rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist">
              <i className="bi bi-bookmark-heart"></i>
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu-price">
              <h5 className="mb-0">{price}/-</h5>
            </div>
            <div className="add-to-cart" onClick={handleAddToCart}>
              <button className="btn btn-primary">
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

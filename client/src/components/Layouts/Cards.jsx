/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartItemsSlice";

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
    const item = { id, image, title, price, rating };
    dispatch(addToCart(item));
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        price,
        rating,
      }),
    });
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
              <Link to="/">
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import AddToCartBtn from "../AddToCartBtn";

export default function Cards({
  id,
  image,
  rating,
  title,
  paragraph,
  price,
  renderRatingIcons,
}) {
  return (
    <Col sm={6} lg={4} xl={3}>
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item-rating">{renderRatingIcons(rating)}</div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu-price">
              <h5 className="mb-0">{price}/-</h5>
            </div>
            <AddToCartBtn
              id={id}
              image={image}
              title={title}
              price={price}
              rating={rating}
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

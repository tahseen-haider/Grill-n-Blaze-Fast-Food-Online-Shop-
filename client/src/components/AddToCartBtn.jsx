/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addToCart, fetchCartItems } from "../store/cartItemsSlice";

export default function AddToCartBtn({
  id,
  image,
  title,
  price,
  rating,
  text,
  className,
}) {
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const item = { productId: id, image, title, price, rating, quantity: 1 };

    dispatch(addToCart(item));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(item),
        }
      );

      if (!res.ok) throw new Error("Failed to add item");

      dispatch(fetchCartItems());
    } catch (error) {
      console.error(error);
      dispatch(fetchCartItems());
    }
  };

  return (
    <button
      className={`${className} btn btn-primary`}
      onClick={handleAddToCart}
    >
      <i className="bi bi-bag me-2"></i>
      {text ?? "Add To Cart"}
    </button>
  );
}

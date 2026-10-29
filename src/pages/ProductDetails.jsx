
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setQuantity(1);
      } catch (error) {
        setError("Product not found or could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <Link to="/products">Back to Products</Link>

      <h1>{product.name}</h1>

      <p>Category: {product.category}</p>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>

      <p>
        Stock:{" "}
        {product.stock > 0 ? product.stock : "Out of stock"}
      </p>

      {product.stock > 0 && (
        <div>
          <button
            onClick={() =>
              setQuantity((previous) => Math.max(1, previous - 1))
            }
            disabled={quantity <= 1}
          >
            -
          </button>

          <span> Quantity: {quantity} </span>

          <button
            onClick={() =>
              setQuantity((previous) =>
                Math.min(product.stock, previous + 1)
              )
            }
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;

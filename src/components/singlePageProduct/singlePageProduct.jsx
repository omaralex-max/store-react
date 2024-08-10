import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import "./product.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        ); 
        setProduct(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-page justify-content-center">
      <div className="product-image">
        <img className="image" src={product.image} alt={product.name} />
        
      </div>
      <div className="product-details">
        <h1 className="title">{product.title}</h1>
        <hr />
        <p className="product-description">{product.description}</p>
        <hr />
        <p cla className="product-price">
          ${product.price}
        </p>
        <hr />
        <h3 className="product-category">
          category : {product.category}
        </h3>
        <hr />
        <div className="product-category">
          <h3>rating : {product.rating.rate}</h3>
          <h3>rating-count : {product.rating.count}</h3>
        </div>
        <hr />

        <Button variant="outline-dark" className="add-to-cart-button">Add to Cart</Button>


      </div>
    </div>
  );
};

export default ProductPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/config";
import ProductList from "../components/ProductList";
const SearchResults = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const response = await service.get(`/products/search?title=${encodeURIComponent(query)}`);
       
        const data = await response.data;
        setProducts(data);
      } catch (error) {
        console.log(query)
        console.log(error);
      }
    };

    searchProducts();
  }, [query]);

  return (
    <div className="homepage-container">
      <h2>Search results for: "{query}"</h2>
      <ul>
        {products.length > 0 ? (
          <ProductList products={products} type = "product list" />
        ) : (
          <p>No Products match you query :(</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;
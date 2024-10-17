import React from "react";
import ProductList from "../components/ProductList";
import { useContext } from "react";
import { ProductsContext } from "../context/products.context.jsx";

function HomePage() {
  const { products } = useContext(ProductsContext);
  console.log("context", products);

  return (
    <div>
     <h1>HOME</h1>
      <ProductList products={products} />
    </div>
  );
}

export default HomePage;

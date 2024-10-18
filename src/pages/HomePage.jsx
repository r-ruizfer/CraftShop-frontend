import React from "react";
import ProductList from "../components/ProductList";
import { useContext } from "react";
import { ProductsContext } from "../context/products.context.jsx";

function HomePage() {
  const { products } = useContext(ProductsContext);
  console.log("context", products);
  console.log("category", products[0].category)

  if (!products) {
    return <p>Loading products...</p>;
  }

  return (
    <div id="home-screen">
      <h1 className="title" >HOME</h1>
      <ProductList products={products} type = "product list" />
      <div>
        <h1>Categorias</h1>
        <h2>{products[0].category}</h2>
       
      </div>
    </div>
  );
}

export default HomePage;

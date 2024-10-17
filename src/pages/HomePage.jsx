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
      <h1>HOME</h1>
      <ProductList products={products} />
      <div>
        <h1>Categorias</h1>
        <h2>{products[0].category}</h2>
        {/* {products.category.map((eachCategory, index) => {
          return (
          <h2 key ={index}> {eachCategory}</h2>)
        })} */}
      </div>
    </div>
  );
}

export default HomePage;

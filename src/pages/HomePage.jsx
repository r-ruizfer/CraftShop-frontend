import React from 'react'
import ProductList from "../components/ProductList";
import {useContext, useState, useEffect } from 'react';
import axios from "axios";
import {ProductsContext} from "../context/products.context.jsx";

function HomePage() {
 const [products, setProducts] = useState([])
 const { productsFromContext} = useContext(ProductsContext);
 console.log("context", productsFromContext)

 useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_SERVER_URL}/products`)
    .then((response) => {
      setProducts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

console.log("products state", products)
  return (
    <div>
      Home
      <ProductList products= {products}/>
    </div>
  )
}

export default HomePage

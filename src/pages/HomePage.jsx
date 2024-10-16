import React from 'react'
import ProductList from "../components/ProductList";
import { useState, useEffect } from 'react';
import axios from "axios";


function HomePage() {
 const [products, setProducts] = useState([])

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

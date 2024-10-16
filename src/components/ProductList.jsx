import React from 'react'
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';


function ProductList(props) {
const {products} = props
console.log(products)

  return (
    <div>
        {products.map((eachProduct) => {
            return(
              <Link key={eachProduct._id} to={`/${eachProduct._id}`}>
                <ProductCard eachProduct = {eachProduct}/> 
              </Link> 
            )
        })}
      
    </div>
  )
}

export default ProductList

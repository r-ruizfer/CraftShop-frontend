import React from 'react'
import { useParams } from 'react-router-dom'

function ProductDetails() {

  const params = useParams()
  console.log("params", params)
  return (
    <div >
    <div><img src={product.image} alt="" /></div>
    <h2>{eachProduct.title}</h2>
    <p>{eachProduct.description}</p>
    <p>{eachProduct.price}</p>
  </div>
  )
}

export default ProductDetails

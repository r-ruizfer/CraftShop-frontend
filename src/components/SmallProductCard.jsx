import React from 'react'

function SmallProductCard(props) {

  const {eachProduct}= props
console.log(eachProduct)

  return (
    <div>
      <h2>{eachProduct.title}</h2>
    </div>
  )
}

export default SmallProductCard


import React from 'react'

function Cart(props) {

  const {productInCart, setProductsInCart}= props

  console.log(productInCart)
  return (
    <div>
      {productInCart.map((eachProduct) => {
            return(
              <Link key={eachProduct._id} to={`/${eachProduct._id}`}>
                <SmallProductCard eachProduct = {eachProduct}/> 
              </Link> 
            )
        })}
    </div>
  )
}

export default Cart

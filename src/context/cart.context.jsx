import React, { useState, useEffect, createContext } from "react";

//comparte la data de productos a traves de la app
const CartContext = createContext();

//wrapper que almacena la informacion

function CartWrapper({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);
  

  // Recuperar el carrito

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    /* console.log("savedcart", savedCart);*/
    if (savedCart) {
      setProductsInCart(JSON.parse(savedCart));
    }
  }, []);



   // BORRAR DEL CARRITO

   const handleDeleteCart = (productId) => {
    const currentCart = productsInCart.filter(
      (eachProduct) => eachProduct._id !== productId
    );
    setProductsInCart(currentCart);
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  return (
    <CartContext.Provider value={{ productsInCart, setProductsInCart, handleDeleteCart}}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartWrapper };

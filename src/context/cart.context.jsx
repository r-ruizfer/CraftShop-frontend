import React, { useState, useEffect, createContext } from "react";

//comparte la data de productos a traves de la app
const CartContext = createContext();

//wrapper que almacena la informacion

function CartWrapper({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);


 
  // Recuperar el carrito

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        console.log("savedcart", savedCart);
        if (savedCart) {
          setProductsInCart(JSON.parse(savedCart));
        }
      }, []);


  return (
    <CartContext.Provider value={{ productsInCart, setProductsInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartWrapper };
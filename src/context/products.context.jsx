import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import service from "../services/config";

//comparte la data de productos a traves de la app
const ProductsContext = createContext();

//wrapper que almacena la informacion

function ProductsWrapper({ children }) {
  const [products, setProducts] = useState(null);


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {
    try {
      const response = await service.get(
        `products`
      )
      setProducts(response.data)
    } catch (error) {
      console.log(error);
    }
  };

if (!products) return <p>Sorry, no products available right now.</p>;

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsWrapper };

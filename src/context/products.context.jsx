import React, { useContext, useState, useEffect, createContext } from "react";
import service from "../services/config";
import { Spinner } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

//comparte la data de productos a traves de la app
const ProductsContext = createContext();

//wrapper que almacena la informacion

function ProductsWrapper({ children }) {
  const [products, setProducts] = useState(null);
  const { user, isLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await service.get(`products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // BORRAR PRODUCTO (ADMIN)
  const handleDelete = async (productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        if (storedToken && isLoggedIn && user && user.isAdmin === true) {
          await service.delete(`/products/${productId}/`);
          window.location.href="/";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!products)
    return (
      <>
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>Sorry, no products available right now.</p>;
      </>
    );

  return (
    <ProductsContext.Provider value={{ products, setProducts, handleDelete }}>
      {children}
    </ProductsContext.Provider>
  );
}

export { ProductsContext, ProductsWrapper };

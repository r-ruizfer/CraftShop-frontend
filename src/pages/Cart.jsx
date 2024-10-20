import React from "react";
import { useEffect } from "react";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

function Cart(props) {
  const { productsInCart, setProductsInCart } = props;

  // Recuperar el carrito

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    console.log("savedcart", savedCart);
    if (savedCart) {
      setProductsInCart(JSON.parse(savedCart));
    }
  }, [setProductsInCart]);

  if (!productsInCart || productsInCart.length === 0)
    return (
      <div>
        <p>No products yet in you cart</p>
        <Link to={"/"}>
          <button>Keep looking</button>
        </Link>
      </div>
    );
  console.log("carrito desde pagina cart", productsInCart);

  return (
    <div id="cart-screen">
      <ProductList products={productsInCart} type="cart" />
    </div>
  );
}

export default Cart;

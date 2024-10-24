import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import PaymentIntent from "./PaymentIntent";

import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import { WishlistContext } from "../context/wishlist.context";

import Button from "react-bootstrap/Button";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { shopping_cart_remove } from "react-icons-kit/ikons/shopping_cart_remove";
import { ic_add_shopping_cart } from "react-icons-kit/md/ic_add_shopping_cart";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function SmallProductCard(props) {
  const { eachProduct, type } = props;

  const { productsInCart, setProductsInCart, handleDeleteCart } =
    useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { wishlist, setWishlist, handleWishlist } = useContext(WishlistContext);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showB, setShowB] = useState(false);

  // COMPROBAR SI LISTA DE DESEOS CAMBIA
  useEffect(() => {
    if (
      wishlist &&
      wishlist.some((product) => product._id === eachProduct._id)
    ) {
      setIsWishlisted(true);
      setCurrentProduct(eachProduct);
    } else {
      setIsWishlisted(false);
    }
  }, [wishlist, eachProduct._id]);

  const toggleWishlist = () => {
    handleWishlist(eachProduct._id); // Añadir o quitar del wishlist
    setIsWishlisted(!isWishlisted); // Cambiar el estado de este producto
  };

  const handleAddToCart = () => {
    let productExists = false;

    const currentCart = [...productsInCart]; //clon del carrito
    productsInCart.forEach((eachProduct, index) => {
      if (currentProduct._id === eachProduct._id) {
        currentCart[index] = {
          ...eachProduct,
          quantity: eachProduct.quantity + 1,
        };
        productExists = true;
      }
    });
    if (!productExists) {
      currentCart.push({ ...currentProduct, quantity: 1 });
    } //si el producto no existia en el carrito lo añadimos con cantidad 1

    setProductsInCart(currentCart);
    //guardar carrito para despues
    localStorage.setItem("cart", JSON.stringify(productsInCart));
    setShowB(true);
    setTimeout(() => {
      setShowB(false);
    }, 3000);
  };

  // CONSOLE LOGS

  console.log("cada producto", eachProduct);
  console.log("user", user);
  console.log("logged", isLoggedIn);
  console.log(wishlist, "lista de deseos DESDE SMALL PRODUCT");

  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="small-card">
      <ToastContainer
        className="p-3"
        position="middle-center"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => {
            setShowB(false);
          }}
          show={showB}
          animation={false}
        >
          <Toast.Header closeButton={false}>
            <Icon icon={ic_add_shopping_cart} />
            <strong className="me-auto"> CraftsShop</strong>
          </Toast.Header>
          <Toast.Body>Product added to your cart!</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="small-product-image">
        <Link key={eachProduct._id} to={`/product/${eachProduct._id}`}>
          <img src={eachProduct.image} alt="" />
        </Link>
        <button className="fav-button" onClick={toggleWishlist}>
          {isWishlisted ? (
            <Icon icon={ic_favorite} />
          ) : (
            <Icon icon={ic_favorite_border} />
          )}
        </button>
      </div>

      <div id="small-card-right">
        <div className="small-card-info">
          <h2>{eachProduct.title}</h2>
          <p>{eachProduct.price} €</p>
          {type === "cart" ? <p>{eachProduct.quantity} units</p> : ""}
        </div>
        {type === "cart" ? (
          ""
        ) : (
          <Button onClick={handleAddToCart} id="add-cart-button">
            <Icon icon={ic_add_shopping_cart} /> Add
          </Button>
        )}

        {type === "cart" ? (
          <>
            {!showPaymentIntent ? (
              <div className="box-buttons">
                <Button
                  id="remove-item-btn"
                  onClick={(event) => {
                    event.preventDefault();
                    handleDeleteCart(eachProduct._id);
                  }}
                >
                  <Icon icon={shopping_cart_remove} /> Remove
                </Button>
                <Button
                  id="purchase-btn"
                  onClick={() => setShowPaymentIntent(true)}
                >
                  Purchase
                </Button>
              </div>
            ) : (
              <>
                <PaymentIntent productDetails={eachProduct} />
                <Button
                  onClick={() => {
                    setShowPaymentIntent(false);
                  }}
                  id="back-pay-button"
                >
                  Cancel
                </Button>
              </>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SmallProductCard;

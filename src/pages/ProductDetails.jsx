import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../services/config";

import ProductList from "../components/ProductList";
import CommentBox from "../components/CommentBox";
import AddProductForm from "../components/AddProductForm";
import PaymentIntent from "../components/PaymentIntent";

import { ProductsContext } from "../context/products.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import { WishlistContext } from "../context/wishlist.context";
import { CommentContext } from "../context/comments.context.jsx";

import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { send } from "react-icons-kit/fa/send";

import { Button } from "react-bootstrap";

import { ic_add_shopping_cart } from "react-icons-kit/md/ic_add_shopping_cart";
import { Spinner, Breadcrumb } from "react-bootstrap";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ProductDetails() {
  const { productId } = useParams();

  const [currentProduct, setCurrentProduct] = useState(null);
  const [moreItems, setMoreItems] = useState([]);
  const [showPaymentIntent, setShowPaymentIntent] = useState(false);
  const [showB, setShowB] = useState(false);

  const { products, setProducts, handleDelete } = useContext(ProductsContext);
  const { productsInCart, setProductsInCart, handleDeleteCart } =
    useContext(CartContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  const {
    wishlist,
    setWishlist,
    isWishlisted,
    setIsWishlisted,
    handleWishlist,
  } = useContext(WishlistContext);
  const {
    comments,
    setComments,
    commentText,
    setCommentText,
    loadComments,
    handleCommentTextChange,
    postComment,
    handleDeleteComment,
  } = useContext(CommentContext);

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  const goWL = () => {
    navigate("/product/:productId");
  };
  const pdBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item onClick={goHome}>Home</Breadcrumb.Item>
      <Breadcrumb.Item onClick={goWL}>Product details</Breadcrumb.Item>
    </Breadcrumb>
  );

  //llamada para recibir el producto actual
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await service.get(`products/${productId}`);
        setCurrentProduct(response.data);
        setIsWishlisted(wishlist.some((product) => product._id === productId));
        setMoreItems(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.log(error);
      }
    };
    loadProduct();
  }, [productId, wishlist]);

  //AÑADIR PRODUCTO AL CARRITO

  const handleAddToCart = () => {
    const currentCart = [currentProduct, ...productsInCart];
    setProductsInCart(currentCart);
    //guardar carrito para despues
    localStorage.setItem("cart", JSON.stringify(currentCart));
    setShowB(true);
    setTimeout(() => {
      setShowB(false);
    }, 3000);
    console.log("Añadido al carrito", productsInCart);
  };

  useEffect(() => {
    loadComments(productId);
  }, [productId]);

  if (!currentProduct)
    return (
      <>
        {pdBreadcrumb}
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>...Loading info...</p>
      </>
    );

  //CONSOLE LOGS
  console.log("carrito", productsInCart);
  console.log("user", user);
  console.log("logged", isLoggedIn);
  console.log("products", products);
  console.log("productID params", productId);
  console.log("current", currentProduct);
  console.log(comments, "comentarios");
  console.log(wishlist, "lista de deseos");

  return (
    <>
      {pdBreadcrumb}
      <div className="product-detail-screen">
        {!currentProduct ? (
          <div id="product-detail-card">
            <p>Product not found :(</p>{" "}
          </div>
        ) : (
          <div id="product-detail-card">
            <div className="product-detail-img">
              <img src={currentProduct.image} alt={currentProduct.title} />
              <button
                className="fav-button"
                onClick={() => handleWishlist(productId)}
              >
                {isWishlisted ? (
                  <Icon icon={ic_favorite} />
                ) : (
                  <Icon icon={ic_favorite_border} />
                )}
              </button>
            </div>
            <div id="product-detail-info">
              <h1>{currentProduct.price} €</h1>
              <h2>{currentProduct.title}</h2>
              <p>{currentProduct.description}</p>

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

              {showPaymentIntent === false ? (
                <div className="box-buttons">
                  <Button onClick={handleAddToCart} id="add-cart-button">
                    <Icon icon={ic_add_shopping_cart} /> Add
                  </Button>
                  <Button
                    className="purchase-button"
                    onClick={() => setShowPaymentIntent(true)}
                  >
                    Purchase
                  </Button>
                </div>
              ) : (
                <>
                  <PaymentIntent productDetails={currentProduct} />
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
            </div>
          </div>
        )}

        {/* SECCION DE CONTROLES DE ADMINISTRADOR */}

        {isLoggedIn && user.isAdmin === true ? (
          <div id="admin-product-box">
            <h3>ADMIN CONTROL PANNEL</h3>
            <p>Here you can handle products of your store.</p>
            <div className="box-buttons">
              <Button
                id="delete-admin-btn"
                variant="outline-danger"
                onClick={() => handleDelete(productId)}
              >
                Delete Product
              </Button>
              <AddProductForm
                title={currentProduct.title}
                description={currentProduct.description}
                price={currentProduct.price}
                image={currentProduct.image}
                category={currentProduct.category}
                id={productId}
                type={"edit"}
              />
            </div>
          </div>
        ) : null}

        {/* SECCION DE COMENTARIOS */}

        <div id="comments-list">
          <h3>Comments section</h3>
          {!comments || comments.length === 0 ? (
            <p>No comments yet for this product</p>
          ) : (
            comments.map((eachComment) => {
              return (
                <CommentBox
                  key={eachComment._id}
                  eachComment={eachComment}
                  productId={productId}
                />
              );
            })
          )}

          <div id="new-comment-box">
            <form onSubmit={(event) => postComment(event, productId)}>
              <input
                id="post-area"
                type="text"
                placeholder="Say something nice here..."
                value={commentText}
                onChange={handleCommentTextChange}
              />
              <button id="post-button" type="submit">
                <Icon icon={send} size={10} />
              </button>
            </form>
          </div>
        </div>

        {/* SECCION VER MAS */}

        <div id="see-more">
          <h3>Discover more items</h3>
          {!products || products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <ProductList products={moreItems} type="product list" />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

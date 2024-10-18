import React from "react";
import ProductList from "../components/ProductList";
import CommentBox from "../components/CommentBox";
import AddProductForm from "../components/AddProductForm";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/products.context.jsx";
import { AuthContext } from "../context/auth.context";

function ProductDetails(props) {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [comments, setComments] = useState(null);
  const { productsInCart, setProductsInCart, wishlist, setWishlist } = props;
  const navigate = useNavigate();

  const { products } = useContext(ProductsContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  //llamada para recibir el producto actual
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await service.get(`products/${productId}`);
        setCurrentProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProduct();
  }, [productId]);

  //Add to cart

  const handleAddToCart = () => {
    const currentCart = [currentProduct, ...productsInCart];

    setProductsInCart(currentCart);

    //guardar carrito para despues
    localStorage.setItem("cart", JSON.stringify(currentCart));

    console.log("Añadido al carrito", productsInCart);
  };
  console.log("carrito", productsInCart);

  // Add to wishlist

  const handleAddToWishlist = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        const response = await service.patch(
          `users/${user._id}/products/${productId}/addWishlist`
        );

        setUserProfile(response.data);
        setWishlist((prevWishlist) => [
          ...prevWishlist,
          response.data.wishlistedItems,
        ]);
      } else {
        setErrorMessage("User ID no available");
      }
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  console.log("user", user);
  console.log("logged", isLoggedIn);

  const handleDelete = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user && user.isAdmin === true) {
        const response = await service.delete(`/products/${productId}/`);
        navigate("/");
        window.location.reload("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // /comments/products/:productId

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await service.get(`comments/products/${productId}`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadComments();
  }, [productId]);

  if (!currentProduct) return <p>Product not found :(</p>;

  //CONSOLE LOGS
  console.log("products", products);
  console.log("productID params", productId);
  console.log("current", currentProduct);
  console.log(comments, "comentarios");
  console.log(wishlist, "lista de deseos");

  return (
    <>
      {!currentProduct ? (
        <div id="product-detail-card">
          <p>Product not found :(</p>{" "}
        </div>
      ) : (
        <div id="product-detail-card">
          <div className="product-detail-img">
            <img src={currentProduct.image} alt={currentProduct.title} />
            <button className="fav-button" onClick={handleAddToWishlist}>
              ❤
            </button>
          </div>
          <div id="product-detail-info">
            <h1>{currentProduct.price} €</h1>
            <h2>{currentProduct.title}</h2>
            <p>{currentProduct.description}</p>
            <button onClick={handleAddToCart} id="add-cart-button">
              Add to cart
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && user.isAdmin === true ? (
        <>
          <button onClick={handleDelete} id="delete-button">
            Delete
          </button>
          <AddProductForm
            title={currentProduct.title}
            description={currentProduct.description}
            price={currentProduct.price}
            image={currentProduct.image}
            category={currentProduct.category}
            id={productId}
            type={"edit"}
          />
        </>
      ) : null}

      <div id="comments-list">
        <h3>Comments section</h3>
        {!comments || comments.length === 0 ? (
          <p>No comments yet for this product</p>
        ) : (
          comments.map((eachComment) => {
            return <CommentBox eachComment={eachComment} />;
          })
        )}

        <div id="new-comment-box">
          <input type="text" placeholder="Say something nice here..." />
          <button type="submit">Post</button>
        </div>
      </div>

      <div id="see-more">
        <h3>Discover more items</h3>
        {!products || products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <ProductList products={products} />
        )}
        {/* quitar de products el producto actual?? */}
      </div>
    </>
  );
}

export default ProductDetails;

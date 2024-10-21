import React from "react";
import ProductList from "../components/ProductList";
import CommentBox from "../components/CommentBox";
import AddProductForm from "../components/AddProductForm";
import service from "../services/config";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/products.context.jsx";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context.jsx";
import { Icon } from "react-icons-kit";
import { ic_favorite } from "react-icons-kit/md/ic_favorite";
import { ic_favorite_border } from "react-icons-kit/md/ic_favorite_border";
import { check } from "react-icons-kit/oct/check";
import { Button } from "react-bootstrap";

function ProductDetails(props) {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [comments, setComments] = useState(null);
  const { wishlist, setWishlist } = props;
  const navigate = useNavigate();

  const { products } = useContext(ProductsContext);
  const { productsInCart, setProductsInCart } = useContext(CartContext);

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [moreItems, setMoreItems] = useState([]);

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

  const handleWishlist = async (productId) => {
    try {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken && isLoggedIn && user) {
        if (isWishlisted) {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/removeWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(false);
          console.log("quitado de favoritos");
          console.log("wishlist");
        } else {
          const response = await service.patch(
            `users/${user._id}/products/${productId}/addWishlist`
          );
          setUserProfile(response.data);
          setWishlist(response.data.wishlistedItems);
          setIsWishlisted(true);
          console.log("añadido a favoritos");
          console.log("wishlist");
        }
      } else {
        setErrorMessage("User ID no available");
        alert("Sorry, you need to log in to add items to wishlist.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user", user);
  console.log("logged", isLoggedIn);

  const handleDelete = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        if (storedToken && isLoggedIn && user && user.isAdmin === true) {
          await service.delete(`/products/${productId}/`);
          navigate("/");
          window.location.reload("/");
        }
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

  //publicar un comentario

  const [commentText, setCommentText] = useState("");

  const handleCommentTextChange = (evento) => {
    let value = evento.target.value;
    setCommentText(value);
  };

  const postComment = async (event) => {
    event.preventDefault();

    const newComment = {
      text: commentText,
      user: user._id,
      product: productId,
    };

    try {
      const storedToken = localStorage.getItem("authToken");

      if (user && storedToken && isLoggedIn === true) {
        await service.post(`/comments/`, newComment, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setCommentText("");
        loadComments();
      } else {
        console.log("usuario sin autentificación");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <button onClick={handleAddToCart} id="add-cart-button">
              Add to cart
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && user.isAdmin === true ? (
        <div className="profile-buttons">
          <Button variant="danger" onClick={handleDelete}>
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
      ) : null}

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
                comments={comments}
              />
            );
          })
        )}

        <div id="new-comment-box">
          <form onSubmit={postComment}>
            <input
              id="post-area"
              type="text"
              placeholder="Say something nice here..."
              value={commentText}
              onChange={handleCommentTextChange}
            />
            <button id="post-button" type="submit">
              <Icon icon={check} />
            </button>
          </form>
        </div>
      </div>

      <div id="see-more">
        <h3>Discover more items</h3>
        {!products || products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <ProductList products={moreItems} type="product list" />
        )}
      </div>
    </>
  );
}

export default ProductDetails;

import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/products.context.jsx";
import ProductList from "../components/ProductList";

function ProductDetails(props) {
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [comments, setComments] = useState(null);
  const {productsInCart, setProductsInCart, wishlist, setWishlist} = props;
 

  const { products } = useContext(ProductsContext);

  //llamada para recibir el producto actual
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/products/${productId}`
        );
        setCurrentProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProduct();
  }, [productId]);


//Add to cart 

const handleAddToCart= ()=> {
 setProductsInCart([currentProduct, ...productsInCart]);
 console.log("Añadido al carrito", productsInCart);
}
console.log("carrito", productsInCart)

// Add to wishlist

const handleAddToWishlist= ()=> {
  setWishlist([currentProduct, ...wishlist]);
  console.log("Añadido a deseos", wishlist);
 }
 console.log("wishlist", wishlist)


  // /comments/products/:productId

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/comments/products/${productId}`
        );
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadComments();
  }, [productId]);

  if (!currentProduct) return <p>Product not found</p>;

  if (!comments){ return <p>No comments yet for this product</p>;}


  //CONSOLE LOGS
  console.log("products", products);
  console.log("productID params", productId);
  console.log("current", currentProduct);
  console.log(comments, "comentarios")

  return (
    <>
    <div id="product-detail-card">
      <div>
        <img src={currentProduct.image} alt={currentProduct.title} />
        <button id="fav-button"   onClick={handleAddToWishlist} >❤</button>
      </div>
      <div id="product-detail-info">
      <h1>{currentProduct.price} €</h1>
        <h2>{currentProduct.title}</h2>
        <p>{currentProduct.description}</p>
        <button onClick={handleAddToCart} id="add-cart-button">Add to cart</button>
      </div>
    </div>

    <div id="comments-list">
      <h3>Comments section</h3>
      <p> {comments.map((eachComment) => {
            return(
             <p>{eachComment}</p>
            )
        })}</p>
    </div>


    <div id="see-more">
      <h3>Discover more items</h3>
      <ProductList products={products} />
      {/* quitar de products el producto actual?? */}
    </div>
    </>
  );
}

export default ProductDetails;

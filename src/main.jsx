import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthWrapper } from "./context/auth.context.jsx";
import { ProductsWrapper } from "./context/products.context";
import { CartWrapper } from "./context/cart.context";
import { WishlistWrapper } from "./context/wishlist.context";
import { CommentWrapper } from "./context/comments.context";

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <ProductsWrapper>
      <WishlistWrapper>
        <CartWrapper>
          <CommentWrapper>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </CommentWrapper>
        </CartWrapper>
      </WishlistWrapper>
    </ProductsWrapper>
  </AuthWrapper>
);

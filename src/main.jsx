import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthWrapper } from "./context/auth.context.jsx";
import { ProductsWrapper } from "./context/products.context";
import { CartWrapper } from "./context/cart.context";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <ProductsWrapper>
      <CartWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartWrapper>
    </ProductsWrapper>
  </AuthWrapper>
);

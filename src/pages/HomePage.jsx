import React, { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { ProductsContext } from "../context/products.context";
import service from "../services/config";
import { Spinner, Breadcrumb } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { products, setProducts } = useContext(ProductsContext);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //esto para recibir token del usuario con passport oath

  const [queries, setQueries] = useSearchParams();
  const authToken = queries.get("authToken");
  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);

      authenticateUser();

      navigate("/profile");
    }
  }, [navigate]);
 

  const goHome = () => {
    navigate("/");
  };
  const goWL = () => {
    navigate("/wishlist");
  };
  const goCart = () => {
    navigate("/cart");
  };
  const homeBreadcrumb = (
    <Breadcrumb>
      <Breadcrumb.Item active>Home</Breadcrumb.Item>
      <Breadcrumb.Item onClick={goWL}>Wishlist</Breadcrumb.Item>
      <Breadcrumb.Item onClick={goCart}>Cart</Breadcrumb.Item>
    </Breadcrumb>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await service.get(`/products?category=${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, setProducts]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (loading || !products) {
    return (
      <>
        <Spinner
          animation="border"
          variant="dark"
          className="homepage-spinner"
        />
        <p>Loading products...</p>
      </>
    );
  }

  return (
    <>
      {homeBreadcrumb}

      <h1 className="homepage-title">HOME</h1>
      <div className="filter-container">
        <label htmlFor="category-filter" className="filter-label">
          Filter by Category
        </label>
        <select
          id="category-filter"
          className="filter-select"
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="">All Categories</option>
          <option value="Prints">Prints</option>
          <option value="Stickers">Stickers</option>
          <option value="Merchandising">Merchandising</option>
          <option value="Painting">Painting</option>
        </select>
        <div>
          {category
            ? `Currently browsing:${category}`
            : `Currently browsing: All Products`}
        </div>
      </div>
      <div className="homepage-container">
        <ProductList type="product list" products={products} />
      </div>
    </>
  );
}

export default HomePage;

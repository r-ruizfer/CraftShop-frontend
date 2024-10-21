import React, { useContext, useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import { ProductsContext } from "../context/products.context";
import service from "../services/config"; // Aquí deberías tener la configuración de tus solicitudes a la API

function HomePage() {
  const { products, setProducts } = useContext(ProductsContext); // Asumiendo que usas context para manejar productos
  const [category, setCategory] = useState(""); // Estado para la categoría seleccionada
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener productos cuando cambie la categoría
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
  }, [category, setProducts]); // Cambia los productos cuando cambia la categoría

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div id="home-screen">
      <h1 className="title">HOME</h1>
      <div className="category">
        <h2>Filter by Category</h2>
        <select onChange={handleCategoryChange} value={category}>
          <option value="">All Categories</option>
          <option value="Prints">Prints</option>
          <option value="Stickers">Stickers</option>
          <option value="Merchandising">Merchandising</option>
          <option value="Painting">Painting</option>
        </select>
      </div>
      <ProductList type="product list" products={products} />
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import Delete from "./Delete"; // Import the Delete component
import Modify from "./Modify";

const Table = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    // Function to fetch all products from the backend API
    const getAllProducts = async () => {
      try {
        const token = localStorage.getItem("JWT");
        const response = await fetch("http://localhost:3000/api/products/getAllProduct", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const responseData = await response.json();
        setProducts(responseData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getAllProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("JWT");
      const response = await fetch(`http://localhost:3000/api/products/deleteProduct/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
  
      // If successful, update the product list
      const updatedProducts = products.filter((product) => product._id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };


  const [showModifyForm, setShowModifyForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleModifyProduct = async (modifiedProduct) => {
    try {
      const token = localStorage.getItem("JWT");
      const response = await fetch(`http://localhost:3000/api/products/updateProduct/${selectedProduct._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedProduct),
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Failed to modify product:", responseText);
        throw new Error("Failed to modify product");
      }

      // If successful, update the product list
      const updatedProducts = products.map(product => {
        if (product._id === selectedProduct._id) {
          return { ...product, ...modifiedProduct };
        }
        return product;
      });
      setProducts(updatedProducts);
      setShowModifyForm(false); // Hide the modification form
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error modifying product:", error);
    }
  };

  return (
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>Id</th>
          <th>Nom produit</th>
          <th>Catégorie</th>
          <th>Quantité</th>
          <th>Description</th>
          <th>Source</th>
          <th>Date d'entrée</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
            <td>{product.source}</td>
            <td>{new Date(product.customDate).toLocaleDateString()}</td>
            <td>
              <div className="flex justify-center">
                <Delete productId={product._id} onDelete={() => handleDeleteProduct(product._id)} />
                <button
                  className="btn btn-success ml-2"
                  onClick={() => {
                    setShowModifyForm(true);
                    setSelectedProduct(product);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-neutral ml-2"
                >
                  Sortie
                </button>
              </div>
            </td>
          </tr>
        ))}
      {showModifyForm && selectedProduct && (
        <tr>
          <td colSpan="8">
            <Modify
              productData={selectedProduct}
              modifyProduct={handleModifyProduct}
            />
          </td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default Table;

import React, { useState, useEffect } from "react";

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

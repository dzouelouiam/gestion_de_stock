import React, { useState, useEffect } from "react";
import Delete from "./Delete"; // Import the Delete component
import Modify from "./Modify";
import Sortie from "../../sortie";
import { data } from "autoprefixer";


const Table = ({products,setProducts}) => {
  

  const [showSortieForm, setShowSortieForm] = useState(false);
  const [selectedProductForSortie, setSelectedProductForSortie] = useState(null);

  



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
    
    <div className="overflow-x-auto">
  <table className="table table-xs text-center">
      {/* head */}
      <thead className="font-bold text-base">
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
      <tbody >
        {products.map((product) => (
          <tr className="!text-sm" key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
            <td>{product.source}</td>
            <td>{new Date(product.customDate).toLocaleDateString()}</td>
            <td>
              <div className="flex flex-row justify-center items-center">

                <button
                  className="ml-2 border-2 w-20 text-center border-success p-1 rounded-lg font-bold hover:text-white hover:bg-success"
                  onClick={() => {
                    setShowModifyForm(true);
                    setSelectedProduct(product);
                  }}
                >
                  Modifier
                </button>
                <button
                  className="ml-2 border-2 w-20 text-center border-warning p-1 rounded-lg font-bold hover:text-white hover:bg-warning"
                  onClick={() => {
                    setShowSortieForm(true);
                    setSelectedProduct(product);
                  }}
                >
                  Sortie
                </button>

                <Delete productId={product._id} onDelete={() => handleDeleteProduct(product._id)} />
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
                setShowCard={setShowModifyForm}
              />
            </td>
          </tr>
        )}
        {showSortieForm && selectedProduct && (
          <tr>
            <td colSpan="8">
              <Sortie
                product={selectedProduct} 
                setShowSortieForm={setShowSortieForm} 
                setProducts = {setProducts}
                products={products}
               
              />
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  );
};

export default Table;

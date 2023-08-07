import React, { useState, useEffect } from 'react';
import Table from './components/entree/table';
import Navbar from './components/navbar';
import AddProduct from './components/entree/add';

const Entree = () => {
  const [showCard, setShowCard] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem('JWT');
      const response = await fetch('http://localhost:3000/api/products/getAllProduct', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddButtonClick = () => {
    // Toggle the visibility of the card when the "Add" button is clicked
    setShowCard(!showCard);
  };

  return (
    <>
      <Navbar />

      <div className="overflow-x-auto">
        <Table products={products} />
        <div className="flex justify-center flex justify-center items-center flex-grow space-x-8 mt-8">
          <button className="btn btn-outline" onClick={handleAddButtonClick}>
            Add
          </button>
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 1</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>

      {/* Show the AddProduct component when showCard is true */}
      {showCard && <AddProduct getAllProducts={getAllProducts} setShowCard={setShowCard} />}
    </>
  );
};

export default Entree;
import React, { useState, useEffect } from 'react';
import Table from './components/entree/table';
import Navbar from './components/navbar';
import AddProduct from './components/entree/add';
import Delete from './components/entree/delete';
import Modify from './components/entree/modify';



const Entree = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    console.log(products);
  }, [products]);


  const getAllProducts = async (page) => {
    try {
      const token = localStorage.getItem('JWT');
      const response = await fetch(`http://localhost:3000/api/products/getAllProduct?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const responseData = await response.json();
      setProducts(responseData);
      return responseData;
  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleAddButtonClick = () => {
    // Toggle the visibility of the card when the "Add" button is clicked
    setShowCard(!showCard);
  };

  return (
    <>
      <Navbar />

      <div className="overflow-x-auto">
        <Table products={products} setProducts={setProducts} />
        <div className="flex justify-center flex justify-center items-center flex-grow space-x-8 mt-8">
          <button className="btn btn-outline" onClick={handleAddButtonClick}>
            Ajouter
          </button>
          <div className="join">
            <button className="join-item btn" onClick={handlePrevPageClick}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={handleNextPageClick}>»</button>
          </div>
        </div>
      </div>

      {/* Show the AddProduct component when showCard is true */}
      {showCard && <AddProduct setProducts={setProducts} setShowCard={setShowCard} />}
    </>
  );
};

export default Entree;
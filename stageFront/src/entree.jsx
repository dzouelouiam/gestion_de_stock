import React, { useState, useEffect } from 'react';
import Table from './components/entree/table';
import Navbar from './components/navbar';
import AddProduct from './components/entree/add';
import Delete from './components/entree/delete';
import Modify from './components/entree/modify';




const Entree = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);//pagination
  const [products, setProducts] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');//category
  const [nomInput, setNomInput] = useState('');//nom du produit


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

  const handleSearchButtonClick = async () => {
    try {
      const token = localStorage.getItem('JWT');
      const response = await fetch(
        `http://localhost:3000/api/products/searchByCategory`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ category: categoryInput }),
        }
      );

      if (!response.ok) {
        throw new Error('Échec de la récupération des produits');
      }

      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error('erreur lors de la récupération des produits:', error);
    }
  };
  const handleSearchByName = async () => {
    try {
      const token = localStorage.getItem('JWT');
      const response = await fetch(
        `http://localhost:3000/api/products/searchByNom`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ nom: nomInput }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error('Error fetching products by name:', error);
    }
  };






  return (
    <>
      <Navbar />

      <div className="overflow-x-auto">
        <Table products={products} setProducts={setProducts} />
        <div className="flex justify-center flex justify-center items-center flex-grow space-x-12 mt-8">
          <input
            type="text"
            placeholder="Nom du produit"
            className="input input-bordered input-xs w-full max-w-xs"
            value={nomInput}
            onChange={(e) => setNomInput(e.target.value)}
          />
          <button className="btn btn-outline" onClick={handleSearchByName}>
            Rechercher
          </button>

          <button className="btn btn-outline" onClick={handleAddButtonClick}>
            Ajouter
          </button>
          <div className="join">
            <button className="join-item btn" onClick={handlePrevPageClick}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn" onClick={handleNextPageClick}>»</button>
          </div>
          <input
            type="text"
            placeholder="Catégorie"
            className="input input-bordered input-xs w-full max-w-xs"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <button className="btn btn-outline" onClick={handleSearchButtonClick}>
            Rechercher
          </button>
        </div>
      </div>

      {/* Show the AddProduct component when showCard is true */}
      {showCard && <AddProduct setProducts={setProducts} setShowCard={setShowCard} />}
    </>
  );
};

export default Entree;
import React, { useState, useEffect } from 'react';
import Table from './components/entree/table';
import Navbar from './components/navbar';
import AddProduct from './components/entree/add';

const Entree = () => {
  const [showCard, setShowCard] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);//pagination
  const [products, setProducts] = useState([]);
  const [filteredProducts,setFilteredProducts]= useState([]);
  const [radio,setRadio]=useState();

  const handleInputChange = (e) =>{

    if(e.target.value !== ''){
      if(radio === 'Nom'){
        setFilteredProducts(products.filter(product=>product.name.includes(e.target.value)))
      }else if(radio === 'catg'){
        setFilteredProducts(products.filter(product=>product.category.includes(e.target.value)))
      }
    }
    else 
      setFilteredProducts(products)

  }

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
      setFilteredProducts(responseData);
      return responseData;

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    setRadio('Nom')
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
        <div className='w-full flex justify-center items-center py-5'>
          <div className='flex flex-col justify-center items-center gap-3 border-2 rounded-3xl bg-base-200 py-5 w-1/4'>
            <div className="flex justify-center gap-5">
              <div className="flex flex-col justify-center items-center"><input type="radio" className="radio" 
              onChange={(e)=>{if(e.target.checked) setRadio('Nom')}} checked={radio==='Nom'}/>
                Nom produit
              </div>
              <div className="flex flex-col justify-center items-center"><input type="radio" className="radio"
              onChange={(e)=>{if(e.target.checked) setRadio('catg')}} checked={radio==='catg'}/>
                Catégorie
              </div>
            </div>
            <input type="text" className="input input-bordered w-full input-sm max-w-xs" 
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Table products={filteredProducts} setProducts={setProducts} />
        <div className="flex justify-center items-center flex-grow space-x-12 my-8  ">


          <div className='bg-base-200 py-5 flex justify-center items-center w-1/4 rounded-3xl '>

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
      </div>

      {/* Show the AddProduct component when showCard is true */}
      {showCard && <AddProduct setProducts={setProducts} setShowCard={setShowCard} />}
    </>
  );
};

export default Entree;
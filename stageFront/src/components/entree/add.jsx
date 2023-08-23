import React, { useState, useEffect } from 'react';

const AddProduct = ({ setProducts, setShowCard }) => {
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        quantity: '',
        description: '',
        source: '',
        customDay: '',
        customMonth: '',
        customYear: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'customYear' || name === 'customMonth' || name === 'customDay') {
          // If changing customYear, customMonth, or customDay, update only those fields
          setProductData((prevData) => ({
            ...prevData,
            [name]: value,
            customDate: `${prevData.customYear}-${prevData.customMonth}-${prevData.customDay}`,
          }));
        } else {
          // For other fields, update the entire productData
          setProductData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('JWT');
      const response = await fetch('http://localhost:3000/api/products/addproduct', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        // Handle error if the product creation fails
        const errorData = await response.json();
        console.error('Error creating product:', errorData);
      } else {
        // Product created successfully, fetch the updated product list
        let newProduct = await response.json();
        console.log(newProduct);
        setProducts(prev=> [...prev, newProduct])

        setShowCard(false); // Close the card after successful product creation
        // Reset the form fields
        setProductData({
          name: '',
          category: '',
          quantity: '',
          description: '',
          source: '',
          customDate: '',
        });
      }
    } catch (error) {
      console.error('Error occurred while creating product:', error);
    }
  };

  useEffect(() => {
    // Add event listener to close card when clicking outside of it
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('bg-slate-500/80')) {
        setShowCard(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [setShowCard]);

  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex flex-col justify-center items-center bg-slate-500/80">
      <div className="card w-1/4 bg-base-200 text-content text-black">
        <div className="card-body ">
          <h2 className="card-title">Ajouter un nouveau produit</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                Nom:
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="input input-bordered w-8/12"
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                Catégorie:
                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="input input-bordered w-8/12"
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              Quantité:
                <input
                  type="number"
                  name="quantity"
                  value={productData.quantity}
                  onChange={handleChange}
                  className="input input-bordered w-8/12"
                  required
                />
              </label> 
            </div>
            <div className="form-control">
              <label className="label">
                Description:
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="input input-bordered w-8/12"
                  required
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                Source:
                <select
                  name="source"
                  value={productData.source}
                  onChange={handleChange}
                  className="select select-bordered w-8/12"
                  required
                >
                  <option value="">Sélectionner la source</option>
                  <option value="fournisseur">Fournisseur</option>
                  <option value="magasin">magasin</option>
                  <option value="marché">Marché</option>
                </select>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                Date d'entrée:
                <input
                  type="date"
                  name="customDate"
                  value={productData.customDate}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </label>
            </div>
            <div className="card-actions justify-end mt-5">
              <button type="submit" className="btn btn-primary">
              Ajouter un produit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
   
  );
};

export default AddProduct;

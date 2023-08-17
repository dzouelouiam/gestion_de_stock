import React, { useState, useEffect } from 'react';

const Modify = ({ productData, modifyProduct, setShowCard }) => {
  const [modifiedData, setModifiedData] = useState({
    name: productData.name,
    category: productData.category,
    quantity: productData.quantity,
    description: productData.description,
    source: productData.source,
    customDate: productData.customDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedData({
      ...modifiedData,
      [name]: value,
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setModifiedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Modified Data:', modifiedData); // Log modifiedData
      const response = await modifyProduct(modifiedData);
      console.log('Modify Response:', response); // Log the response
      // You can handle the success message or action here
      
    } catch (error) {
      console.error('Error occurred while modifying product:', error);
    }
  };

  return (

    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-slate-500/80"
      onClick={() => setShowCard(false)} // Close card when focus is lost
    >
      <div className="card w-1/4 p-5 bg-base-200 text-content text-black"
        onClick={(e)=>e.stopPropagation()}
      >

        <h2 className="card-title">Modifier un produit</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              Nom:
              <input
                type="text"
                name="name"
                value={modifiedData.name}
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
                value={modifiedData.category}
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
                value={modifiedData.quantity}
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
                value={modifiedData.description}
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
                value={modifiedData.source}
                onChange={handleChange}
                className="select select-bordered w-8/12"
                required
              >
                <option value="">Sélectionner la source</option>
                <option value="fournisseur">Fournisseur</option>
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
                value={modifiedData.customDate}
                onChange={handleDateChange}
                className="input input-bordered w-8/12"
                required
              />
            </label>
          </div>
          <div className="card-actions justify-end mt-5">
            <button type="submit" className="btn btn-primary">
              Modifier le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modify;

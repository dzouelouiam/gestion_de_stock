import React, { useState } from 'react';

const Modify = ({ productData, modifyProduct }) => {
  const [modifiedData, setModifiedData] = useState({
    name: productData.name,
    category: productData.category,
    quantity: productData.quantity,
    description: productData.description,
    source: productData.source,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModifiedData({
      ...modifiedData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await modifyProduct(modifiedData);
      // You can handle the success message or action here
    } catch (error) {
      console.error('Error occurred while modifying product:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="flex w-full max-w-lg p-6 base-300 neutral-content rounded-lg shadow-lg">
        <div className="card-body">
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="input input-bordered"
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
                  className="select select-bordered"
                  required
                >
                  <option value="">Sélectionner la source</option>
                  <option value="fournisseur">Fournisseur</option>
                  <option value="marché">Marché</option>
                </select>
              </label>
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                Modifier le produit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modify;

import React, { useState } from 'react';

const Sortie = ({ product, setShowSortieForm }) => {
    const [sortieData, setSortieData] = useState({
        quantitySortie: '',
        destination: '',
        dateSortie: '',
    });
    
      const handleSortieChange = (e) => {
        const { name, value } = e.target;
        setSortieData({
          ...sortieData,
          [name]: value,
        });
      };

    const handleSortieSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const token = localStorage.getItem("JWT");
          sortieData.product = product._id;
          const response = await fetch(`http://localhost:3000/api/products/createProductSortie`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(sortieData),
          });
          if (!response.ok) {
            throw new Error("Failed to create product sortie");
          }
      
          console.log("Product Sortie created successfully");
          setSortieData({
            quantitySortie: "",
            destination: "",
            dateSortie: "",
          });
      
          setShowSortieForm(false); 
        } catch (error) {
          console.error("Error creating product sortie:", error);
        }
      };
      

    return (
        <div
            className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-slate-500/80">
            <div className="card w-1/4 p-5 bg-base-200 text-content text-black">
                <h2 className="card-title">Sortie de produit</h2>
                <form onSubmit={handleSortieSubmit}>
                    <div className="form-control">
                        <label className="label">
                            Quantité de sortie:
                            <input
                                type="number"
                                name="quantitySortie"
                                value={sortieData.quantitySortie}
                                onChange={handleSortieChange}
                                className="input input-bordered w-8/12"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            Destination:
                            <input
                                type="text"
                                name="destination"
                                value={sortieData.destination}
                                onChange={handleSortieChange}
                                className="input input-bordered w-8/12"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            Date de sortie:
                            <input
                                type="date"
                                name="dateSortie"
                                value={sortieData.dateSortie}
                                onChange={handleSortieChange}
                                className="input input-bordered w-8/12"
                                required
                            />
                        </label>
                    </div>
                    <div className="card-actions justify-end mt-5">
                        <button type="submit" className="btn btn-primary">
                            Confirmer la sortie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Sortie;

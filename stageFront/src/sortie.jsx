import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
const Sortie = ({ product, setShowSortieForm , setProducts, products}) => {

    const { register, handleSubmit } = useForm();

    const submit = async (data) => {
        const {destination, quantitySortie, dateSortie} = data;
        try {
            const token = localStorage.getItem("JWT");
            const response = await fetch(`http://localhost:3000/api/products/createProductSortie`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product: product._id, 
                    quantitySortie,
                    destination,
                    dateSortie
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create product sortie");
            }
            let updatedProducts = products.map((prod) => {
                if (prod._id === product._id) {
                  return {
                    ...prod,
                    quantity: prod.quantity - quantitySortie,
                  };
                }
                return prod;
              });
              
              setProducts(updatedProducts);
              
            console.log("Product Sortie created successfully");

            setShowSortieForm(false);

        } catch (error) {
            console.error("Error creating product sortie:", error);
        }
    }


    return (
        <div
            className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-slate-500/80">
            <div className="card w-1/4 p-5 bg-base-200 text-content text-black">
                <h2 className="card-title">Sortie de produit</h2>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="form-control">
                        <label className="label">
                            Quantité de sortie:
                            <input
                                type="number"
                                /* name="quantitySortie"
                                value={sortieData.quantitySortie}
                                onChange={handleSortieChange} */
                                className="input input-bordered w-8/12"
                                {...register("quantitySortie")}
                            />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label ">
                            Destination:
                            <select
                                {...register("destination")}
                                className="select select-bordered w-8/12"
                            >
                                <option placeholder hidden >Sélectionner destination</option>
                                <option value="fournisseur">Fournisseur</option>
                                <option value="marché">Marché</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            Date de sortie:
                            <input
                                type="date"
                                {...register("dateSortie")}
                                className="input input-bordered"
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

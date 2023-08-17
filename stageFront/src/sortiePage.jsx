import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';

const SortiePage = () => {
    const [productSorties, setProductSorties] = useState([]);

    useEffect(() => {
        const getAllProductSorties = async () => {
            try {
                const token = localStorage.getItem("JWT");
                const response = await fetch("http://localhost:3000/api/products/getAllProductSorties", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch product sorties");
                }

                const responseData = await response.json();
                setProductSorties(responseData);
                console.log("productSorties:", responseData); // Log the entire array

                // Log details of each product object within the array
                responseData.forEach((productSortie) => {
                    console.log("product:", productSortie.product);
                });

            } catch (error) {
                console.error("Error fetching product sorties:", error);
            }
        };

        getAllProductSorties();
    }, []);

    return (
        <>
            <Navbar />
            <div className="overflow-x-auto">
                <table className="table table-xs text-center">
                    <thead className="font-bold text-base">
                        <tr>
                            <th>Id</th>
                            <th>Nom produit</th>
                            <th>Catégorie</th>
                            <th>Quantité sortie</th>
                            <th>Description</th>
                            <th>Destination</th>
                            <th>Date de sortie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productSorties.map((productSortie) => (
                            <tr className="!text-sm" key={productSortie._id}>
                                <td>{productSortie._id}</td>
                                <td>{productSortie.product?.name}</td>
                                <td>{productSortie.product?.category}</td>
                                <td>{productSortie.quantitySortie}</td>
                                <td>{productSortie.product?.description}</td>
                                <td>{productSortie.destination}</td>
                                <td>{new Date(productSortie.dateSortie).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SortiePage;

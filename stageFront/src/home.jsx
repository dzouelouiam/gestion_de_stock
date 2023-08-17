import React, { useState, useEffect } from 'react';
import { UilBox, UilDropbox, UilUser } from '@iconscout/react-unicons'
import Navbar from './components/navbar';
import { Link } from "react-router-dom";
import Profile from './profile';

const Home = () => {

    const [entréeStats, setEntréeStats] = useState({});
    const [sortieStats, setSortieStats] = useState({});

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const token = localStorage.getItem('JWT');

                const entréeResponse = await fetch('http://localhost:3000/api/products/statistics/entrees', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const entréeData = await entréeResponse.json();
                setEntréeStats(entréeData);

                const sortieResponse = await fetch('http://localhost:3000/api/products/statistics/sorties', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const sortieData = await sortieResponse.json();
                setSortieStats(sortieData);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <div className='relative flex flex-col w-full h-screen bg-base-200'>
            <Navbar />


            <div className='absolute w-full flex justify-center top-44'>
                <div className="stats shadow-md w-2/6 bg-base-100 ">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <UilBox className="inline-block w-8 h-8 stroke-current text-black " />
                        </div>
                        <div className="stat-title">Total Entrées</div>
                        <div className="stat-value text-primary">{entréeStats.totalEntrées || 0}</div>
                        <div className="stat-desc">Total Sortie Quantity: {entréeStats.totalEntréesQuantity || 0}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <UilDropbox className="inline-block w-8 h-8 stroke-current text-black " />
                        </div>
                        <div className="stat-title">Total Sorties</div>
                        <div className="stat-value text-primary ">{sortieStats.totalSorties || 0}</div>
                        <div className="stat-desc">Total Sortie Quantity: {sortieStats.totalSortieQuantity || 0}</div>
                    </div>
                </div>
            </div>








            <div className="flex justify-center items-center flex-grow space-x-8 mt-8">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-content">
                        <figure className="px-10 pt-10">
                            <UilBox className="w-20 h-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Entrée</h2>
                            <p>Les entrées du stock</p>
                            <div className="card-actions">
                                <Link to="/entree">
                                    <button className="btn btn-primary">Entrée</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-content">
                        <figure className="px-10 pt-10">
                            <UilDropbox className="w-20 h-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Sortie</h2>
                            <p>Les sorties du stock</p>
                            <div className="card-actions">
                                <Link to="/sortie">
                                    <button className="btn btn-primary">Sortie</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-content">
                        <figure className="px-10 pt-10">
                            <UilUser className="w-20 h-20" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Profile</h2>
                            <p>Vue profile</p>
                            <div className="card-actions">
                                <div className="drawer drawer-end">
                                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                    <div className="drawer-content">
                                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">profile</label>
                                    </div>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                                        <Profile />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Home;

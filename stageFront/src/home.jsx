import React from 'react';
import { UilBox, UilDropbox, UilUser } from '@iconscout/react-unicons'
import Navbar from './components/navbar';
import { Link } from "react-router-dom";
import Profile from './profile';

const Home = () => {
    return (
        <div className='flex flex-col w-full h-screen'>
            <Navbar />

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
                                        <Profile/>
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

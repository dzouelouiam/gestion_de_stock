import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { UilUserCircle } from '@iconscout/react-unicons';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('JWT');
            try {
                const response = await fetch('http://localhost:3000/api/users/getuser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setName(userData.name);
                    setEmail(userData.email);
                    setPhone(userData.phone);
                    setBio(userData.bio);
                } else {
                    console.error('Error fetching user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateProfile = async () => {
        const token = localStorage.getItem('JWT');
        try {
            const response = await fetch('http://localhost:3000/api/users/updateuser', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, email, phone, bio }),
            });

            if (response.ok) {
                setSuccessMessage('Mise à jour du profil réussie');
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage('Erreur');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setSuccessMessage('');
            setErrorMessage('Erreur');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center h-screen bg-gray-100 shadow-ms">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="flex justify-center items-center mb-4">
                        <UilUserCircle size="64" className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Votre Profile</h2>
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">Nom</label>
                        <input
                            type="text"
                            className="input input-bordered input-xs w-full max-w-xs"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            className="input input-bordered input-xs w-full max-w-xs"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">Téléphone</label>
                        <input
                            type="text"
                            className="input input-bordered input-xs w-full max-w-xs"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 text-sm mb-1">Bio</label>
                        <textarea
                            className="textarea textarea-bordered textarea-xs w-full max-w-xs"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                    {/* Success Message */}
                    {successMessage && (
                        <div className="alert alert-success mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{successMessage}</span>
                        </div>
                    )}
                    {/* Error Message */}
                    {errorMessage && (
                        <div className="alert alert-error mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}
                    <button className="btn btn-primary w-full" onClick={handleUpdateProfile}>
                        Mettre à jour le profil
                    </button>
                </div>
            </div>
        </>
    );
}

export default Profile;






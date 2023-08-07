import React from 'react';
import { useEffect } from 'react';
import Table from './components/entree/table';
import Navbar from './components/navbar';

const Entree = () => {
    useEffect(()=>{
        
    },[])
    return (
        <>
            <Navbar/>
            
            <div className="overflow-x-auto">
                <Table/>
                <div className="flex justify-center flex justify-center items-center flex-grow space-x-8 mt-8">
                    <button className="btn btn-outline">Add</button>
                    <div className="join">
                        <button className="join-item btn">«</button>
                        <button className="join-item btn">Page 1</button>
                        <button className="join-item btn">»</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Entree;

import React, { useState } from "react";
import { UilTrashAlt } from '@iconscout/react-unicons'

const Delete = ({ onDelete }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirmOpen(true);
  };

  const handleCancelClick = () => {
    setIsConfirmOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsConfirmOpen(false);
  };

  return (
    <div className="relative flex justify-center items-center">
      <UilTrashAlt className="text-error ml-2 hover:cursor-pointer" onClick={handleConfirmClick}/>
        
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-500/80">
          <div className="card w-1/4 bg-base-200 text-content text-black">
            <div className="card-body flex flex-col justify-center items-center gap-5 text-center">
              <h2 className="card-title">Confirmer la suppression</h2>
              <p>Voulez-vous vraiment supprimer ce produit?</p>
              <div className="w-full mt-3 flex justify-around">
                <button className="btn btn-outline btn-success hover:!text-white" onClick={handleDeleteClick}>Confirmer</button>
                <button className="btn btn-outline btn-error hover:!text-white" onClick={handleCancelClick}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;

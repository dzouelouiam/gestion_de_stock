import React, { useState } from "react";

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
      <button className="btn btn-square" onClick={handleConfirmClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-500/80">
          <div className="card w-1/4 bg-base-200 text-content text-black">
            <div className="card-body text-center">
              <h2 className="card-title">Confirmer la suppression</h2>
              <p>Voulez-vous vraiment supprimer ce produit?</p>
              <div className="w-full mt-3 flex justify-around">
                <button className="btn btn-primary" onClick={handleDeleteClick}>Confirmer</button>
                <button className="btn btn-error" onClick={handleCancelClick}>Annuler</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;

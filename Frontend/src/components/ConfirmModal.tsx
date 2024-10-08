import React, { ReactNode } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { cartActions } from '../reducers/cartReducer';

const ConfirmModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const abortHandler = () => {
    dispatch(cartActions.RESET_CART_AND_SHIPPING_ADDRESS());

    onClose();
    navigate('/');
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full text-center mb-4">
        <span>
          Voulez-vous vraiment
          <span className="text-red-500">annuler votre commande</span> ?
        </span>
        <p>Toutes vos données seront effacées</p>
      </div>
      <div className="text-right">
        <button
          className="py-1 px-6 mx-5 bg-emerald-600 rounded text-white"
          onClick={onClose}
        >
          Annuler
        </button>
        <button
          onClick={abortHandler}
          className="py-1 px-6 bg-red-200 text-red-700 rounded hover:bg-red-300 transition"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

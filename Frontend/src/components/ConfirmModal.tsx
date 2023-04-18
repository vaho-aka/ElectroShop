import React, { ReactNode } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { cartActions } from '../reducers/cartReducer';
import { ShippingAddress } from '../interface/interfaces';

const ConfirmModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const abortHandler = () => {
    const shippingAddress: ShippingAddress = {
      address: '',
      city: '',
      neighbour: '',
      paymentMethod: '',
      phoneNumber: '',
    };

    dispatch(cartActions.ADD_SHIPPING_ADDRESS(shippingAddress));

    onClose();
    navigate('/');
  };

  return (
    <Modal onClose={onClose}>
      <div className="w-full text-center mb-4">
        <h3>
          Voulez-vous vraiment <span className="text-red-500">Annuler</span>?
        </h3>
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
          className="py-1 px-6 bg-red-200 text-red-700 rounded"
        >
          Confirmer
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

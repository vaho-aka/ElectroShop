import { useState } from 'react';
import Stepper from '../components/Stepper';
import { useAppSelector } from '../hooks';
import ConfirmModal from '../components/ConfirmModal';

const PlaceOrderPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { items, totalAmount, shippingAddress } = useAppSelector(
    (state) => state.cart
  );

  const confirmModalHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <Stepper>
      {showModal && <ConfirmModal onClose={confirmModalHandler} />}
      <div className="border rounded p-4 sm:min-w-[400px]">
        <div className="flex border-b-2 pb-2">
          <div className="flex flex-col gap-1 w-fit mr-4">
            <span>Nom</span>
            <span>Email</span>
            <span>Téléphone</span>
            <span>Address</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Irna</span>
            <span>irna@example.com</span>
            <span>+261 {shippingAddress.phoneNumber}</span>
            <span>{`${shippingAddress.address}, ${shippingAddress.neighbour}, ${shippingAddress.city}`}</span>
          </div>
        </div>
        <ul className="mt-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="bg-slate-300 rounded p-2 my-2 flex items-center justify-between"
            >
              <div>
                <span>{item.name}</span>
                <span className="bg-white px-1 rounded ml-4">
                  x {item.amount}
                </span>
              </div>
              <span className="min-w-fit">
                {item.amount * +item.price.split(' ').join('')} Ar
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t-2 pt-4 my-4 flex items-center justify-between">
          <h3>Prix Total</h3>
          <span>{totalAmount} Ar</span>
        </div>
        <div className="text-right">
          <button
            className="py-1 px-6 mx-5 bg-gray-200 text-gray-700 rounded"
            onClick={confirmModalHandler}
          >
            Annuler
          </button>
          <button className="py-1 px-6 bg-emerald-600 rounded text-white">
            Valider
          </button>
        </div>
      </div>
    </Stepper>
  );
};

export default PlaceOrderPage;

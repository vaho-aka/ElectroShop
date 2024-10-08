import { useEffect, useState } from 'react';
import Stepper from '../components/Stepper';
import { useAppDispatch, useAppSelector } from '../hooks';
import ConfirmModal from '../components/ConfirmModal';
import { placeOrder } from '../actions/orderActions';
import { useNavigate } from 'react-router-dom';

const PlaceOrderPage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, shippingAddress } = useAppSelector(
    (state) => state.cart
  );
  const { orderItems } = useAppSelector((state) => state.order);
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const confirmModalHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  useEffect(() => {
    if (orderItems.length) navigate(`/user/$${userLoggedIn._id}`);
  }, [orderItems]);

  const placeOrderHandler = () => {
    console.log('order placed');
    const order: any = {
      items,
      shippingAddress,
      totalPrice: totalAmount,
    };

    dispatch(placeOrder(order));
  };

  const formatter = new Intl.NumberFormat('de-DE');

  return (
    <Stepper>
      {showModal && <ConfirmModal onClose={confirmModalHandler} />}
      <div className=" rounded sm:min-w-[400px] sm:bg-white sm:shadow">
        <div className="flex py-4 px-2">
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
        <ul className="my-4 bg-slate-300 px-2">
          {items.map(({ product, amount }) => (
            <li
              key={product._id}
              className=" py-2 flex items-center justify-between"
            >
              <div>
                <span>{product.name}</span>
                <span className="bg-white px-4 rounded-full ml-4">
                  x {amount}
                </span>
              </div>
              <span className="min-w-fit">
                {formatter.format(amount * product.price)}
                Ar
              </span>
            </li>
          ))}
        </ul>
        <div className=" p-2 flex items-center justify-between">
          <h3>Prix Total</h3>
          <span>{formatter.format(totalAmount)} Ar</span>
        </div>
        <div className="flex w-full py-4 px-2 gap-2">
          <a
            href="/shipping"
            className="py-1 flex-1 px-6 text-center bg-gray-200 text-gray-700 rounded"
          >
            Retoure
          </a>
          <button
            className="py-1 flex-1 px-6 bg-emerald-600 rounded text-white"
            onClick={placeOrderHandler}
          >
            Valider
          </button>
        </div>
      </div>
    </Stepper>
  );
};

export default PlaceOrderPage;

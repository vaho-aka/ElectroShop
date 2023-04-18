import Modal from './Modal.jsx';
import CartItem from './CartItem.jsx';
import { cartActions } from '../reducers/cartReducer.js';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks.js';

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, totalAmount } = useAppSelector((state) => state.cart);

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  const clickHandler = () => {
    navigate('/shipping');
    dispatch(cartActions.SHOW_CART());
  };

  return (
    <Modal onClose={showCartHandler}>
      <div className="flex gap-4 items-center justify-between border-b-2">
        <h3 className="text-xl">Prix total:</h3>
        <span>{totalAmount} Ar</span>
      </div>
      <div className="my-4 p-1 overflow-y-scroll max-h-[20rem]">
        {items.map((item) => (
          <CartItem item={item} key={item._id} />
        ))}
      </div>
      <div className="flex items-center justify-end gap-5">
        <button
          onClick={showCartHandler}
          className="py-1 px-6 bg-gray-200 text-gray-700 rounded"
        >
          Fermer
        </button>
        <button
          onClick={clickHandler}
          disabled={items.length > 0 ? false : true}
          className="py-1 px-6 bg-emerald-600 rounded text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300"
        >
          Commander
        </button>
      </div>
    </Modal>
  );
};

export default Cart;

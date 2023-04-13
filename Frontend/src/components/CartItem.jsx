import React, { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import { cartActions } from '../reducers/cartReducer.js';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [itemNumber, setItemNumber] = useState(item.amount);

  const inscreaseItemNumber = () => {
    if (item.countInStock > itemNumber) {
      setItemNumber((itemNumber) => itemNumber + 1);
    }

    const product = { ...item, amount: 1 };
    dispatch(cartActions.ADD_ITEM(product));
  };

  const descreaseItemNumber = () => {
    if (itemNumber > 1) {
      setItemNumber((itemNumber) => itemNumber - 1);
    }

    dispatch(cartActions.REMOVE_ITEM(item._id));
  };

  return (
    <div className="w-full flex items-center my-2">
      <div className="w-[10rem] h-[6.25rem]">
        <img
          className="object-contain object-center w-full h-full"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div className="mx-4">
        <h3>{item.name}</h3>
        <h6>{item.price} Ar</h6>
      </div>
      <div className="flex items-center gap-5 p-4 max-w-fit ml-auto">
        <button className="bg-gray-400 rounded" onClick={descreaseItemNumber}>
          <Minus size={24} color="#f1f5f9" />
        </button>
        <input
          type="number"
          className="w-10 text-center"
          value={itemNumber}
          onChange={(e) => setItemNumber(e.target.value)}
          min={1}
          max={item.countInStock}
        />
        <button className="bg-gray-400 rounded" onClick={inscreaseItemNumber}>
          <Plus size={24} color="#f1f5f9" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

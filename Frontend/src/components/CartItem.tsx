import React, { useEffect, useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import { cartActions } from '../reducers/cartReducer';
import { Item } from '../interface/interfaces';
import { useAppDispatch } from '../hooks.js';

const CartItem: React.FC<{ item: Item; amount: number }> = ({
  item,
  amount,
}) => {
  const dispatch = useAppDispatch();
  const [itemNumber, setItemNumber] = useState(amount);

  const inscreaseItemNumber = () => {
    if (item.countInStock > itemNumber) {
      setItemNumber((itemNumber) => itemNumber + 1);

      const product = { product: item, amount: 1 };
      dispatch(cartActions.ADD_ITEM(product));
    }
  };

  const descreaseItemNumber = () => {
    if (itemNumber >= 1) {
      setItemNumber((itemNumber) => itemNumber - 1);

      dispatch(cartActions.REMOVE_ITEM(item._id));
    }
  };

  const formatter = new Intl.NumberFormat('de-DE');

  return (
    <div className="w-full flex items-center my-2 bg-slate-100 rounded">
      <div className="w-[10rem] h-[6.25rem] my-2">
        <img
          className="object-contain object-center w-full h-full"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div className="mx-4">
        <h3>{item.name}</h3>
        <span>{formatter.format(item.price)} Ar</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 max-w-fit ml-auto">
        <button className="bg-gray-400 rounded" onClick={descreaseItemNumber}>
          <Minus size={24} color="#f1f5f9" />
        </button>
        <input
          type="number"
          className="w-10 text-center focus:outline-none"
          value={itemNumber}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setItemNumber(+e.currentTarget.value)
          }
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

export default React.memo(CartItem);

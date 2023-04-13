import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Plus, Minus } from '@phosphor-icons/react';
import { cartActions } from '../reducers/cartReducer.js';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [itemNumber, setItemNumber] = useState(1);

  const [product] = products.filter((product) => product._id === productId);

  const addToCartHandler = (e) => {
    e.preventDefault();

    const item = { ...product, amount: itemNumber };
    dispatch(cartActions.ADD_ITEM(item));
  };

  const inscreaseItemNumber = () => {
    if (product.countInStock > itemNumber) {
      setItemNumber((itemNumber) => itemNumber + 1);
    }
  };

  const descreaseItemNumber = () => {
    if (itemNumber > 1) {
      setItemNumber((itemNumber) => itemNumber - 1);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5 items-stretch md:max-h-[30rem]">
      <div className="flex justify-center items-center border rounded p-4">
        <div className="md:max-w-[40rem] max-h-[25rem] h-full w-full">
          <img
            className="object-contain object-center w-full h-full"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 border p-4 md:max-w-[40rem] rounded ">
        <h3 className="text-3xl border-b pb-2">{product.name}</h3>
        <div className="flex gap-4 items-center">
          <h3 className="text-xl underline">Prix:</h3>
          <span>{product.price} Ar</span>
        </div>
        <div>
          <h3 className="text-xl underline">description: </h3>
          <p className="pt-4">{product.description}</p>
        </div>
        <form
          onSubmit={addToCartHandler}
          className=" flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-5 my-4">
              <h3 className="text-xl underline">En stock:</h3>
              <span>{product.countInStock}</span>
            </div>
            <div className="flex items-center gap-5 border p-4 rounded max-w-fit">
              <button
                className="bg-gray-400 rounded"
                onClick={descreaseItemNumber}
              >
                <Minus size={24} color="#f1f5f9" />
              </button>
              <input
                type="number"
                className="w-10 text-center"
                value={itemNumber}
                onChange={(e) => setItemNumber(e.target.value)}
                min={1}
                max={product.countInStock}
              />
              <button
                className="bg-gray-400 rounded"
                onClick={inscreaseItemNumber}
              >
                <Plus size={24} color="#f1f5f9" />
              </button>
            </div>
          </div>
          <button className="w-full py-4 bg-slate-900  text-neutral-200 mt-4">
            Ajouter au panier
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailPage;

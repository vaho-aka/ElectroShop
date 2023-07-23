import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus } from '@phosphor-icons/react';
import { cartActions } from '../reducers/cartReducer';
import SkeletonLoading from '../components/SkeletonLoading';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppSelector, useAppDispatch } from '../hooks';

const ProductDetailPage: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const [itemNumber, setItemNumber] = useState(1);

  const [product] = products.filter((product) => product._id === productId);

  const addToCartHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const item = { ...product, amount: itemNumber };
    dispatch(cartActions.ADD_ITEM(item));
    setItemNumber(1);
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

  const inputNumberChangeHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setItemNumber(+e.currentTarget.value);

  return (
    <div className="grid sm:grid-cols-2 gap-5 items-stretch max-w-[400px]  sm:max-w-none">
      <div className="flex justify-center items-center border rounded p-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="max-w-[20rem] max-h-[12.5rem] lg:max-w-[40rem] lg:max-h-[25rem] h-full w-full">
            <img
              className="object-contain object-center w-full h-full"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 border p-4 sm:max-w-none rounded w-full">
        {loading ? (
          <SkeletonLoading count={1} />
        ) : (
          <h3 className="text-3xl border-b pb-2">{product.name}</h3>
        )}
        <div className="flex gap-4 items-center">
          {loading ? (
            <>
              <SkeletonLoading width={150} />
            </>
          ) : (
            <>
              <h3 className="text-xl underline">Prix:</h3>
              <span>{product.price} Ar</span>
            </>
          )}
        </div>
        <div>
          {loading ? (
            <>
              <SkeletonLoading count={1} />
              <SkeletonLoading height={100} width={606} />
            </>
          ) : (
            <>
              <h3 className="text-xl underline">description: </h3>
              <p className="pt-4">{product.description}</p>
            </>
          )}
        </div>
        {loading ? (
          <SkeletonLoading height={50} />
        ) : (
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
                <div
                  className="cursor-pointer bg-gray-400 rounded"
                  onClick={descreaseItemNumber}
                >
                  <Minus size={24} color="#f1f5f9" />
                </div>
                <input
                  type="number"
                  className="w-10 text-center"
                  value={itemNumber}
                  onChange={inputNumberChangeHandler}
                  min={1}
                  max={product.countInStock}
                />
                <div
                  className="cursor-pointer bg-gray-400 rounded"
                  onClick={inscreaseItemNumber}
                >
                  <Plus size={24} color="#f1f5f9" />
                </div>
              </div>
            </div>
            <button
              className="w-full py-4 bg-slate-900  text-neutral-200 mt-4 active:translate-y-1  shadow-lg shadow-gray-300 active:shadow-none transition-all"
              type="submit"
            >
              Ajouter au panier
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

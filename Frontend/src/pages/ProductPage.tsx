import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { cartActions } from '../reducers/cartReducer';
import SkeletonLoading from '../components/SkeletonLoading';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getProductById } from '../actions/productActions';
import Rating from '../components/Rating';

const ratingData = [
  { star: 5, pourcentage: '70%' },
  { star: 4, pourcentage: '17%' },
  { star: 3, pourcentage: '8%' },
  { star: 2, pourcentage: '4%' },
  { star: 1, pourcentage: '1%' },
];

const ProductDetailPage: React.FC<{ loading?: boolean }> = ({ loading }) => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
  const [itemNumber, setItemNumber] = useState(1);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId]);

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

  const submitRatingHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Evaluating...');
  };

  return (
    <div className="max-w-[1300px]">
      <div className="grid grid-cols-1 max-w-[700px] lg:grid-cols-2 gap-5 lg:items-stretch lg:max-w-none">
        <div className="bg-white flex justify-center items-center border-y sm:border sm:rounded py-20 lg:p-4">
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
        <div className="flex bg-white flex-col gap-4 border-y sm:border p-4 sm:max-w-none rounded w-full">
          {loading ? (
            <SkeletonLoading count={1} />
          ) : (
            <div className="border-b pb-2 flex items-center">
              <h3 className="text-3xl border-l-4 border-emerald-500 px-4">
                {product.name}
              </h3>
            </div>
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
                    <RiSubtractLine size={24} color="#f1f5f9" />
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
                    <RiAddLine size={24} color="#f1f5f9" />
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
        <div className="p-4 border rounded w-full bg-white border-y sm:border">
          <div className="border-b pb-2">
            <h3 className="text-3xl border-l-4 border-emerald-500 px-4">
              Évaluation du produit
            </h3>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <Rating value={3.5} />
            <span>1 745 évaluations</span>
          </div>
          {ratingData.map(({ star, pourcentage }) => (
            <div className="flex items-center" key={star}>
              <span className="flex-1">{star} étoile</span>
              <div className="w-2/4 h-5 mx-4 flex-auto bg-gray-200 rounded">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: pourcentage }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 flex-1">
                {pourcentage}
              </span>
            </div>
          ))}
          <div className="mt-4">
            <form
              onSubmit={submitRatingHandler}
              className="flex flex-col gap-2"
            >
              <textarea
                name=""
                id=""
                placeholder="Rédiger votre avis..."
                rows={5}
                maxLength={255}
                required
                className="resize-none bg-gray-50 border focus:outline-none p-2"
              ></textarea>
              <label htmlFor="rating">Évaluer le produit :</label>
              <select required id="rating">
                <option value="">Choisir...</option>
                <option value="1">1 - Mauvais</option>
                <option value="2">2 - Équitable</option>
                <option value="3"> 3 - Bien</option>
                <option value="4">4 - Très bien</option>
                <option value="5">5 - Excellent</option>
              </select>
              <button className="w-full py-4 bg-slate-900  text-neutral-200 mt-4 active:translate-y-1  shadow-lg shadow-gray-300 active:shadow-none transition-all">
                Valider
              </button>
            </form>
          </div>
        </div>
        <div className="p-4 border-y sm:border rounded bg-white w-full">
          <div className="border-b pb-2">
            <h3 className="text-3xl border-l-4 border-emerald-500 px-4">
              Avis des clients
            </h3>
          </div>
          <ul className="overflow-y-scroll lg:max-h-[80vh]">
            {Array.from('vahoaka').map((id, i) => (
              <li className="py-2" key={i}>
                <div className="flex items-center gap-2">
                  <Link to="/">
                    <img
                      src="/api/v1/uploads/users/avatar.jpg"
                      alt="user photo"
                      className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-500"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <Link to="/" className="hover:underline">
                      <span>Vahoaka</span>
                    </Link>
                    <span className="text-gray-500">il y a 1 mois</span>
                  </div>
                </div>
                <div className="py-2">
                  <Rating value={3} />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae dicta cupiditate labore et eum facilis molestiae?
                  Quaerat similique est, enim, impedit vitae culpa natus tempore
                  beatae, laborum nulla rem aspernatur!
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

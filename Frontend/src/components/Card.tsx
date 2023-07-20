import React from 'react';
import { Link } from 'react-router-dom';
import SkeletonLoading from './SkeletonLoading';
import { Item } from '../interface/interfaces';

/* 
const anime = {
  background: 'linear-gradient(90deg, #00b0ff 50%, #ffea00 50%)',
  transition: 'all 0.4s',
  backgroundSize: '250%',

  '&:hover': {
    backgroundPosition: '100%',
    color: '#202444',
  },
};
*/

const Card: React.FC<{ product: Item; loading?: boolean }> = ({
  product,
  loading,
}) => {
  return (
    <figure className="w-60 shadow-lg shadow-gray-300 p-2 flex flex-col gap-4 bg-gray-150 rounded last-of-type:justify-self-start">
      {loading ? (
        <SkeletonLoading height={127} />
      ) : (
        <Link to={`/details/${product._id}`} className="flex justify-center">
          <img
            src={product.imageUrl}
            className="py-2 max-h-32"
            alt={product.name}
          />
        </Link>
      )}
      <figcaption className=" flex flex-col h-full gap-2">
        {loading ? (
          <SkeletonLoading count={1.5} />
        ) : (
          <>
            <Link to={`/details/${product._id}`} className="hover:underline">
              <h6>{product.name}</h6>
            </Link>
            <p>{product.price} Ar</p>
          </>
        )}
        {loading ? (
          <SkeletonLoading height={20} />
        ) : (
          <Link
            to={`/details/${product._id}`}
            className="py-1  text-neutral-200 w-full bg-slate-900 text-center"
          >
            Details
          </Link>
        )}
      </figcaption>
    </figure>
  );
};

export default React.memo(Card);

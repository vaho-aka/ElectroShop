import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <figure className="w-60 shadow-md shadow-gray-300 p-2 flex flex-col gap-4 bg-gray-50 rounded last-of-type:justify-self-start">
      <Link to={`/details/${product._id}`} className="flex justify-center">
        <img
          src={product.imageUrl}
          className="py-2 max-h-32"
          alt={product.name}
        />
      </Link>
      <figcaption className=" flex flex-col h-full gap-2">
        <Link to={`/details/${product._id}`} className="hover:underline">
          <h6>{product.name}</h6>
        </Link>
        <p>{product.price} Ar</p>
        <Link
          to={`/details/${product._id}`}
          className="py-1 bg-slate-900  text-neutral-200 w-full text-center"
        >
          Details
        </Link>
      </figcaption>
    </figure>
  );
};

export default Card;

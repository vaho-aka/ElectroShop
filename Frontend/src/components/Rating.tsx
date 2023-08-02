import React from 'react';
import { RiStarLine, RiStarFill, RiStarHalfFill } from 'react-icons/ri';

const Star = (value: number, nbr1: number, nbr2: number) =>
  value >= nbr1 ? (
    <RiStarFill size={20} />
  ) : value >= nbr2 ? (
    <RiStarHalfFill size={20} />
  ) : (
    <RiStarLine size={20} />
  );

const Rating: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center justify-between gap-1 w-fit text-yellow-300">
      {Star(value, 1, 0.5)}
      {Star(value, 2, 1.5)}
      {Star(value, 3, 2.5)}
      {Star(value, 4, 3.5)}
      {Star(value, 5, 4.5)}
    </div>
  );
};

export default Rating;

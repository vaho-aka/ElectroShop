import React from 'react';
import { Link } from 'react-router-dom';

const NavigationLink = () => {
  return (
    <ul className="hidden w-0 h-0 sm:flex sm:w-fit sm:h-fit items-center gap-5">
      <li>
        <Link
          to="/register"
          className="py-1 px-6 hover:text-gray-400 transition-colors"
        >
          S'incrire
        </Link>
      </li>
      <li>
        <Link
          to="/sign"
          className="py-1 px-6 hover:bg-emerald-600 rounded border-2 border-emerald-600 text-emerald-600 hover:text-white transition-all"
        >
          Connecter
        </Link>
      </li>
    </ul>
  );
};

export default NavigationLink;

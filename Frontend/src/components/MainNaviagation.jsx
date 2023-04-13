import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartSimple } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../reducers/cartReducer.js';

const MainNaviagation = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  // const searchHandler = (e) => {
  //   e.preventDefault();

  //   console.log('searching...');
  // };

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  return (
    <header className="fixed w-full top-0 py-4 text-neutral-200 bg-slate-900 flex justify-center">
      <nav className="px-4 sm:px-6 flex items-center gap-4 justify-between max-w-[1400px] w-full">
        <Link to="/" className="text-2xl">
          <h5>ElectroShop</h5>
        </Link>
        <ul className="flex items-center gap-10">
          <li>
            <div className="relative">
              <button onClick={showCartHandler}>
                <ShoppingCartSimple size={32} />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs bg-emerald-600 rounded-full -top-2 -right-2 dark:border-gray-900">
                  {items.length}
                </div>
              </button>
            </div>
          </li>
          <li>
            <Link to="/register">S'incrire</Link>
          </li>
          <li>
            <Link to="/sign" className="py-1 px-6 bg-emerald-600 rounded">
              Connecter
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNaviagation;

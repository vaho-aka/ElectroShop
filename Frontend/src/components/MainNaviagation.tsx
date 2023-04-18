import { Link } from 'react-router-dom';
import { ShoppingCartSimple } from '@phosphor-icons/react';
import { cartActions } from '../reducers/cartReducer.js';
import MenuAccount from './MenuAccount.jsx';
import { useAppDispatch, useAppSelector } from '../hooks.js';

const MainNaviagation = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  return (
    <header className="py-4 text-neutral-200 bg-slate-900 flex justify-center">
      <nav className="px-4 sm:px-6 flex items-center gap-4 justify-between max-w-[1400px] w-full">
        <Link to="/" className="text-2xl">
          <h5>ElectroShop</h5>
        </Link>
        <div className="flex items-center gap-5">
          <div className="relative">
            <button onClick={showCartHandler}>
              <ShoppingCartSimple size={32} />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs bg-emerald-600 rounded-full -top-2 -right-2 dark:border-gray-900">
                {items.length}
              </div>
            </button>
          </div>
          <ul className="hidden w-0 h-0 sm:flex sm:w-fit sm:h-fit items-center gap-5">
            <li>
              <Link to="/register" className="py-1 px-6">
                S'incrire
              </Link>
            </li>
            <li>
              <Link to="/sign" className="py-1 px-6 bg-emerald-600 rounded">
                Connecter
              </Link>
            </li>
          </ul>
          <div className="block sm:hidden sm:w-0 sm:h-0">
            <MenuAccount />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNaviagation;

import { Link } from 'react-router-dom';
import { cartActions } from '../reducers/cartReducer.js';
import MenuAccount from './MenuAccount.jsx';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { useEffect, useState } from 'react';
import NavigationLink from './NavigationLink.js';
import { RiShoppingCartLine } from 'react-icons/ri';

const MainNaviagation = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const [showNavLink, setShowNavLink] = useState(true);

  useEffect(() => {
    if (userLoggedIn.name) setShowNavLink(false);
    else setShowNavLink(true);
  }, [userLoggedIn]);

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
              <RiShoppingCartLine size={30} />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs bg-emerald-600 rounded-full -top-2 -right-2 dark:border-gray-900">
                {items.length}
              </div>
            </button>
          </div>
          {showNavLink && <NavigationLink />}
          <MenuAccount />
        </div>
      </nav>
    </header>
  );
};

export default MainNaviagation;

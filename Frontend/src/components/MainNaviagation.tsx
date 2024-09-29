import { Link, useLocation } from 'react-router-dom';
import { cartActions } from '../reducers/cartReducer.js';
import MenuAccount from './MenuAccount.jsx';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { useEffect, useState } from 'react';
import NavigationLink from './NavigationLink.js';
import { RiShoppingCartLine, RiSearchLine, RiCloseLine } from 'react-icons/ri';
import { getSearchProducts } from '../actions/productActions.js';

const MainNaviagation = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { items } = useAppSelector((state) => state.cart);
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const [showNavLink, setShowNavLink] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (userLoggedIn.name) setShowNavLink(false);
    else setShowNavLink(true);
  }, [userLoggedIn]);

  useEffect(() => {
    if (pathname.includes('shipping') || pathname.includes('placeorder'))
      setIsActive(false);
    else setIsActive(true);
  });

  const showCartHandler = () => {
    dispatch(cartActions.SHOW_CART());
  };

  const searchHandler = () => {
    console.log(searchValue);

    dispatch(getSearchProducts(searchValue));
  };

  return (
    <header className="py-4 text-neutral-200 bg-slate-900 flex justify-center">
      <nav className="px-4 sm:px-6 flex items-center gap-4 justify-between max-w-[1400px] w-full">
        <div className="flex gap-5 items-center">
          <Link to="/" className="text-2xl">
            <h5>ElectroShop</h5>
          </Link>
          <form
            onSubmit={searchHandler}
            className="border border-slate-600 rounded flex items-center"
          >
            <input
              type="search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-0 bg-transparent focus:outline-none ml-2"
            />
            <button className="hover:bg-emerald-500 transition-all border-l border-slate-600 hover:text-slate-800 rounded-e py-1 px-4">
              <RiSearchLine size={26} className="" />
            </button>
          </form>
        </div>
        <div className="flex items-center gap-5">
          {isActive && (
            <div className="relative">
              <button onClick={showCartHandler}>
                <RiShoppingCartLine size={30} />
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs bg-emerald-600 rounded-full -top-2 -right-2">
                  {items.length}
                </div>
              </button>
            </div>
          )}

          {showNavLink && <NavigationLink />}
          <MenuAccount />
        </div>
      </nav>
    </header>
  );
};

export default MainNaviagation;

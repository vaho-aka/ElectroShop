import React, { ReactNode, useEffect } from 'react';
import MainNaviagation from './MainNaviagation.jsx';
import Cart from './Cart.jsx';
import Footer from './Footer';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { useLocation } from 'react-router-dom';
import { userActions } from '../reducers/userReducer.js';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { showCart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(userActions.GET_USER_FAIL(''));
  }, [pathname]);

  return (
    <div className="bg-gray-50 relative">
      <Cart />
      <MainNaviagation />
      <main className="py-4 w-full flex justify-center main">{children}</main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);

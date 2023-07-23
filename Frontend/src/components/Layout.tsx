import React, { ReactNode, useEffect } from 'react';
import MainNaviagation from './MainNaviagation.jsx';
import Cart from './Cart.jsx';
import Footer from './Footer';
import { useAppSelector } from '../hooks.js';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { showCart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="">
      {showCart && <Cart />}
      <MainNaviagation />
      <main className="py-4 w-full flex justify-center main">
        <div className="max-w-[1300px]">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);

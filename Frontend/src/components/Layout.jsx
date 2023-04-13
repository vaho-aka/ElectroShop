import React from 'react';
import MainNaviagation from './MainNaviagation.jsx';
import Cart from './Cart.jsx';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { showCart } = useSelector((state) => state.cart);

  return (
    <div className="flex items-center justify-center">
      {showCart && <Cart />}
      <MainNaviagation />
      <main className="mt-16 sm:mx-8 py-4 max-w-[1300px] w-full flex justify-center">
        {children}
      </main>
    </div>
  );
};

export default React.memo(Layout);

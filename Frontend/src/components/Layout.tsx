import React, { ReactNode, useEffect, useState } from 'react';
import MainNaviagation from './MainNaviagation.jsx';
import Cart from './Cart.jsx';
import ArrowButton from './ArrowButton.jsx';
import Footer from './Footer';
import { useAppSelector } from '../hooks.js';
import { useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { showCart } = useAppSelector((state) => state.cart);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.pageYOffset >=
        document.body.scrollHeight - 50;

      setShowButton(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="">
      {showCart && <Cart />}
      <MainNaviagation />
      {showButton && <ArrowButton />}
      <main className="py-4 w-full flex justify-center main">
        <div className="max-w-[1300px]">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);

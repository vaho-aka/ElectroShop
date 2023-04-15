import React, { useEffect, useState } from 'react';
import MainNaviagation from './MainNaviagation.jsx';
import Cart from './Cart.jsx';
import { useSelector } from 'react-redux';
import ArrowButton from './ArrowButton.jsx';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { showCart } = useSelector((state) => state.cart);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      if (
        document.body.scrollHeight - 50 >= window.innerHeight &&
        scrollPosition === pageHeight
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
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

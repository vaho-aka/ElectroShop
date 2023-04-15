import React from 'react';
import { Copyright } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 min-h-[5rem] flex justify-center gap-2 bg-slate-700 text-white ">
      <div className="flex items-center gap-2 max-w-[1400px] w-full">
        <Copyright size={24} />
        <span>Tous droits réservés 2023.</span>
      </div>
    </footer>
  );
};

export default Footer;

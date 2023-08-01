import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const NavigationMobileLink = () => {
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center bg-opacity-20 text-sm font-medium text-white rounded-md bg-black p-2">
        <RiMenuLine size={22} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col p-1">
          <Menu.Item>
            <Link to="/login" className="p-2">
              Connecter
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register" className="p-2">
              S'incrire
            </Link>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavigationMobileLink;

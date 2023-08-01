import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../actions/userActions';
import { RiArrowDropDownLine } from 'react-icons/ri';

const MenuAccount = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center bg-opacity-20 text-sm font-medium text-white rounded-md bg-black px-2">
        <div className="flex items-center gap-2 py-2 sm:p-0">
          <span>{userLoggedIn.name}</span>
          <RiArrowDropDownLine size={22} />
          <div className="h-10 w-10 rounded-full overflow-hidden hidden sm:flex">
            <img
              src={userLoggedIn.imageUrl}
              alt="user photo"
              className="w-full h-full"
            />
          </div>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-slate-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col p-1">
          {!userLoggedIn ? (
            <>
              <Menu.Item>
                <Link
                  to="/login"
                  className="py-2 px-4  hover:bg-slate-600 rounded-md"
                >
                  Se connecter
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  to="/register"
                  className="py-2 px-4 hover:bg-slate-600 rounded-md"
                >
                  S'inscrire
                </Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Link
                  to={`/user/${userLoggedIn._id}`}
                  className="hover:bg-slate-600 rounded-md py-2 px-4 "
                >
                  Mon profile
                </Link>
              </Menu.Item>
              {userLoggedIn.isAdmin && (
                <Menu.Item>
                  <Link
                    to="/admin"
                    className="hover:bg-slate-600 rounded-md py-2 px-4 "
                  >
                    Administration
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item>
                <span
                  onClick={logoutHandler}
                  className="hover:bg-slate-600 rounded-md py-2 px-4  cursor-pointer"
                >
                  Déconnexion
                </span>
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuAccount;

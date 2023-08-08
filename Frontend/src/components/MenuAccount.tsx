import { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../actions/userActions';
import {
  RiArrowDropDownLine,
  RiMenuLine,
  RiLogoutBoxLine,
  RiUserLine,
  RiFunctionLine,
} from 'react-icons/ri';

const classesLink =
  'hover:bg-slate-600 flex items-center gap-1 rounded-md py-2 px-4';

const MenuAccount = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const [userImage, setUserImage] = useState(userLoggedIn.imageUrl);

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    setUserImage(userLoggedIn.imageUrl);
  }, [userLoggedIn]);

  return (
    <Menu
      as="div"
      className={`relative z-50 inline-block text-left ${
        !userLoggedIn.name ? 'md:hidden' : ''
      }`}
    >
      <Menu.Button
        className={`inline-flex w-full justify-center bg-opacity-20 text-sm font-medium text-white rounded-md bg-black px-2 ${
          !userLoggedIn.name ? 'py-1' : ''
        }`}
      >
        {userLoggedIn.name ? (
          <div className="flex items-center gap-2 py-2 sm:p-0">
            <span>{userLoggedIn.name}</span>
            <RiArrowDropDownLine size={22} />
            <img
              src={userImage}
              alt="user photo"
              className="h-10 w-10 rounded-full ring-2 hidden sm:inline-block ring-white"
            />
          </div>
        ) : (
          <RiMenuLine size={22} />
        )}
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
          {!userLoggedIn.name ? (
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
                <Link to={`/user/${userLoggedIn._id}`} className={classesLink}>
                  <RiUserLine />
                  <span>Mon profile</span>
                </Link>
              </Menu.Item>
              {userLoggedIn.isAdmin && (
                <Menu.Item>
                  <Link to="/admin" className={classesLink}>
                    <RiFunctionLine />
                    <span>Administration</span>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item>
                <div
                  onClick={logoutHandler}
                  className="hover:bg-red-500 hover:bg-opacity-20 text-red-500 rounded-md py-2 px-4 flex items-center gap-1 transition-all cursor-pointer"
                >
                  <RiLogoutBoxLine />
                  <span>Déconnexion</span>
                </div>
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuAccount;

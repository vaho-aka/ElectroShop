import React, { ReactNode, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import { useAppSelector } from '../hooks';

const Stepper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { shippingAddress, items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!items.length) navigate('/');
  }, [items]);

  useEffect(() => {
    if (pathname === '/placeorder' && !shippingAddress.address)
      navigate('/shipping');
  }, [pathname, shippingAddress]);

  return (
    <div className="w-full sm:min-w-[440px] max-w-[500px]">
      <ul className="flex items-center justify-around relative">
        <li>
          <NavLink
            to="/shipping"
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center ${
                isActive && 'text-emerald-600'
              }`
            }
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border border-emerald-600 ${
                shippingAddress.address && 'bg-emerald-600'
              } rounded-full shrink-0 dark:border-blue-500`}
            >
              {shippingAddress.address ? <Check size={24} color="white" /> : 1}
            </span>
            <span
              className={`${shippingAddress.address && 'text-emerald-600'}`}
            >
              Adresse d'expédition
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink
            style={{
              pointerEvents: shippingAddress.address ? undefined : 'none',
            }}
            to="/placeorder"
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center ${
                isActive && 'text-emerald-600'
              }`
            }
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border ${
                shippingAddress.address
                  ? 'border-emerald-600'
                  : 'border-gray-600'
              } rounded-full shrink-0 dark:border-blue-500`}
            >
              3
            </span>
            <span>Passer mes commandes</span>
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center my-10">{children}</div>
    </div>
  );
};

export default Stepper;

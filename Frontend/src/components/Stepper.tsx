import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import { useAppSelector } from '../hooks';

const Stepper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { shippingAddress } = useAppSelector((state) => state.cart);

  return (
    <div className="sm:min-w-[40rem] md:min-w-[50rem] lg:min-w-[60rem] w-full">
      <ul className="flex items-center justify-between relative">
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
            <span>Adresse d'expédition</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            aria-disabled={shippingAddress.address ? false : true}
            to="/payment"
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center ${
                isActive
                  ? 'text-emerald-600'
                  : 'cursor-not-allowed text-gray-800'
              }`
            }
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border ${
                shippingAddress.address
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-gray-600'
              } rounded-full shrink-0 dark:border-blue-500`}
            >
              {shippingAddress.paymentMethod ? <Check size={24} /> : 2}
            </span>
            <span>Mode de paiement</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/placeorder"
            className={({ isActive }) =>
              `flex flex-col gap-2 items-center ${
                isActive
                  ? 'text-emerald-600'
                  : 'cursor-not-allowed text-gray-800'
              }`
            }
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border ${
                shippingAddress.paymentMethod
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-gray-600'
              } rounded-full shrink-0 dark:border-blue-500`}
            >
              3
            </span>
            <span>Passer la commande</span>
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center my-10">{children}</div>
    </div>
  );
};

export default Stepper;

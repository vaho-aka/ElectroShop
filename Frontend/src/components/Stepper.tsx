import React, { ReactNode, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Check } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ShippingAddressType } from '../interface/interfaces';
import { cartActions } from '../reducers/cartReducer';

const Stepper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { shippingAddress, items } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!items.length) navigate('/');
  }, [items]);

  useEffect(() => {
    if (pathname === '/placeorder' && !shippingAddress.address)
      navigate('/shipping');
  }, [pathname, shippingAddress]);

  const resetShippingAdressHandler = () => {
    const shippingAdress: ShippingAddressType = {
      address: '',
      city: '',
      neighbour: '',
      paymentMethod: '',
      phoneNumber: '',
    };

    dispatch(cartActions.ADD_SHIPPING_ADDRESS(shippingAdress));
  };

  return (
    <div className="w-full max-w-[500px]">
      <ul className="flex items-center justify-around relative">
        <li onClick={resetShippingAdressHandler}>
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
              } rounded-full shrink-0 dark:border-emerald-500`}
            >
              {shippingAddress.address ? <Check size={24} color="white" /> : 1}
            </span>
            <span
              className={`${shippingAddress.address && 'text-emerald-600'}`}
            >
              Adresse de livraison
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
              } rounded-full shrink-0 dark:border-emerald-500`}
            >
              2
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

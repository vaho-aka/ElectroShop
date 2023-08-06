import { useRef } from 'react';
import { useAppDispatch } from '../hooks';
import { cartActions } from '../reducers/cartReducer';
import { ShippingAddressType } from '../interface/interfaces';
import { useNavigate } from 'react-router-dom';
import Stepper from '../components/Stepper';

const classesInput =
  'border p-2 focus:outline-none rounded h-12 bg-white sm:bg-gray-50 ';

const ShippingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addressRef = useRef<HTMLInputElement>(null);
  const neighbourRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const addressValue = addressRef.current!.value;
    const neighbourValue = neighbourRef.current!.value;
    const cityValue = cityRef.current!.value;
    const phoneNumberValue = phoneNumberRef.current!.value;

    const shippingAddress: ShippingAddressType = {
      address: addressValue,
      neighbour: neighbourValue,
      city: cityValue,
      phoneNumber: phoneNumberValue,
      paymentMethod: 'Paypal',
    };

    dispatch(cartActions.ADD_SHIPPING_ADDRESS(shippingAddress));
    navigate('/placeorder');
  };

  return (
    <Stepper>
      <div className="sm:px-4 py-4 sm:border rounded sm:bg-white">
        <h3 className="text-2xl w-full text-center mb-4">
          Adresse de livraison
        </h3>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="address">Adresse</label>
            <input
              autoFocus
              type="text"
              id="address"
              placeholder="Entrer votre adresse"
              required
              ref={addressRef}
              className={classesInput}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="neibour">Quartier</label>
            <input
              type="text"
              id="neibour"
              placeholder="Entrer votre quartier"
              required
              ref={neighbourRef}
              className={classesInput}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              placeholder="Entrer votre ville"
              required
              ref={cityRef}
              className={classesInput}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="phone">Numéro de téléphone</label>
            <div className="border p-2 rounded flex items-center gap-2 h-12 bg-white sm:bg-gray-50">
              <span className="pr-2 border-r-2">🇲🇬 +261</span>
              <input
                type="text"
                id="phone"
                placeholder="34 xx xxx xx"
                required
                ref={phoneNumberRef}
                className="border-0 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label>Mode de paiement</label>
            <div className="flex items-center gap-2">
              <input type="radio" id="paypal" defaultChecked={true} />
              <label htmlFor="paypal">Paypal</label>
            </div>
          </div>
          <div className="text-right">
            <button className="py-1 px-6 bg-emerald-600 rounded text-white">
              Suivant
            </button>
          </div>
        </form>
      </div>
    </Stepper>
  );
};

export default ShippingPage;

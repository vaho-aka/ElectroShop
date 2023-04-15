import React, { useState } from 'react';

const ShippingPage = () => {
  const [address, setAddress] = useState('');
  const [neighbour, setNeighbour] = useState('');
  const [city, setCity] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-2xl w-full text-center mb-4">Adresse de livraison</h3>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            id="address"
            placeholder="Entrer votre adresse"
            required
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="neibour">Quartier</label>
          <input
            type="text"
            id="neibour"
            placeholder="Entrer votre quartier"
            required
            onChange={(e) => setNeighbour(e.target.value)}
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            placeholder="Entrer votre ville"
            required
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="text-right">
          <button className="py-1 px-6 bg-emerald-600 rounded text-white">
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;

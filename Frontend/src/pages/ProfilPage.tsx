import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks';

const inputClasses =
  'border bg-gray-50 p-2 focus:outline-none rounded h-12 sm:bg-gray-50 bg-white';
const tableClasses =
  'bg-background p-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between';

const ProfilPage = () => {
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(userLoggedIn.email);
  const [userName, setUserName] = useState(userLoggedIn.name);
  const [activeBtn, setActiveBtn] = useState(false);

  const modifyProfilHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('sending...');
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  useEffect(() => {
    setActiveBtn(
      email !== userLoggedIn.email || userName !== userLoggedIn.name || password
        ? true
        : false
    );
  }, [userLoggedIn, userName, email, password]);

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 p-4 w-full">
      <div className="md:col-span-1 max-w-[400px] m-auto lg:m-0">
        <div>
          <h1 className="text-2xl">Profile d'utilisateur</h1>
        </div>
        <form
          className="w-full sm:border-2 sm:p-4 my-4 rounded-md sm:bg-white"
          onSubmit={modifyProfilHandler}
        >
          <div className="h-32 w-32 bg-slate-500 mb-4 rounded-full">
            <img
              src={userLoggedIn.imageUrl}
              className="h-full w-full"
              alt="user photo"
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="name">Nom d'utilisateur</label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setUserName(e.currentTarget.value)
              }
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              value={email}
              id="email"
              placeholder="votre_email@example.com"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="password">Mot de passe</label>
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              id="password"
              placeholder="votre mot de passe"
              type={!showPassword ? 'password' : 'text'}
              className={inputClasses}
            />
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="checkbox"
                onChange={showPasswordHandler}
                checked={showPassword}
              />
              <label htmlFor="checkbox">Afficher mot de passe</label>
            </div>
          </div>
          <button
            disabled={activeBtn ? false : true}
            type="submit"
            className={`${
              activeBtn ? '' : 'cursor-not-allowed bg-gray-500'
            } w-full py-2 bg-slate-900  text-neutral-200 mt-4`}
          >
            Méttre à jour
          </button>
        </form>
      </div>
      <div className="md:col-span-2">
        <div>
          <h1 className="text-2xl">Mes commandes</h1>
        </div>
        <div className="w-full">
          <div
            className={`${tableClasses} my-4 bg-slate-400 text-white rounded-t-md`}
          >
            <span>ID</span>
            <span className="hidden lg:block">Date</span>
            <span className="hidden sm:block">Prix total (Ar)</span>
            <span className="sm:text-left text-right">Payé</span>
            <span className="hidden md:block">Livraison</span>
          </div>
          <ul className="bg-white">
            {Array.from('vahoaka irna rak').map((nm, i) => (
              <li key={i} className={`${tableClasses} border-b`}>
                <span>sdf2s3f5183fs</span>
                <span className="hidden lg:block">2023/08/01</span>
                <span className="hidden sm:block">3 240 000</span>
                <span className="sm:text-left text-right">Payé</span>
                <span className="hidden md:block">En cours</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilPage;

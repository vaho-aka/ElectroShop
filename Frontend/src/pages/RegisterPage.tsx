import React, { useState } from 'react';
import { EyeSlash, Eye } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('signing...');
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="sm:min-w-[400px] w-full flex flex-col gap-4 py-4 border p-4 rounded-md">
      <div className="w-full text-center my-4">
        <h2 className="text-3xl">Inscription</h2>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setUserName(e.currentTarget.value)
            }
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="votre_email@example.com"
            required
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="password">Mot de passe</label>
          <div className="border py-1 px-2 rounded flex items-center justify-between h-12">
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              required
              id="password"
              placeholder="votre mot de passe"
              type={!showPassword ? 'password' : 'text'}
              className="focus:outline-none w-full"
            />
            {password && (
              <div className="hidden sm:block" onClick={showPasswordHandler}>
                {!showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
              </div>
            )}
          </div>

          <div className="flex gap-2 items-center sm:hidden">
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
          type="submit"
          className="w-full py-2 bg-slate-900  text-neutral-200 mt-4"
        >
          S'incrire
        </button>
      </form>
      <div className="w-full text-right my-2 text-neutral-900">
        <span>Déjà membre ?</span>
        <Link
          className="ml-2 hover:underline hover:text-emerald-600 transition-all"
          to="/sign"
        >
          Se connecter →
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

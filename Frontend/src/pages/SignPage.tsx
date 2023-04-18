import React, { useState } from 'react';
import { Crown, EyeSlash, Eye } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const SignPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    console.log('signing...');
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="sm:max-w-[400px] w-full flex flex-col gap-4 border p-4 rounded-md">
      <div className="w-full flex flex-col items-center">
        <div className="flex justify-center items-center h-20 w-20 rounded-full ring-2 ring-emerald-600 text-emerald-600">
          <Crown size={50} />
        </div>
        <span className="pt-4">Veuillez connecter à votre compte</span>
      </div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="votre_email@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 focus:outline-none rounded h-12"
          />
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="password">Mot de passe</label>
          <div className="border py-1 px-2 rounded flex items-center justify-between h-12">
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              id="password"
              placeholder="votre mot de passe"
              type={showPassword ? 'password' : 'text'}
              className="focus:outline-none w-full"
            />
            {password && (
              <div onClick={showPasswordHandler}>
                {showPassword ? <EyeSlash size={32} /> : <Eye size={32} />}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-slate-900  text-neutral-200 mt-4"
        >
          Connecter
        </button>
      </form>
      <Link
        to="/register"
        className="w-full text-center py-2 bg-emerald-600  text-neutral-200"
      >
        S'incrire
      </Link>
    </div>
  );
};

export default SignPage;

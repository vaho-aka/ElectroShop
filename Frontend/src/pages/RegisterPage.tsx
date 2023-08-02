import React, { useEffect, useState } from 'react';
import { RiEyeOffLine, RiEyeLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { register } from '../actions/userActions';
import { useForm } from 'react-hook-form';
import { registerType } from '../interface/interfaces';

const RegisterPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { userLoggedIn } = useAppSelector((state) => state.user);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>();

  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userLoggedIn.name) navigate(redirect);
  }, [userLoggedIn]);

  const submitHandler = (data: registerType) => {
    dispatch(register(data.username, data.email, data.password));
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="max-w-[400px] h-fit w-full flex flex-col gap-4 py-4 sm:border p-4 rounded-md my-10 sm:bg-white sm:shadow-lg sm:shadow-gray-300">
      <div className="w-full text-center my-4">
        <h2 className="text-3xl">Inscription</h2>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="name">Nom d'utilisateur</label>
          <input
            type="text"
            required
            id="name"
            {...registerForm('username', {
              required: "Nom d'utilisateur requis",
              minLength: {
                value: 3,
                message:
                  "Le nom d'utilisateur doit comporter au moins 3 caractères",
              },
            })}
            className="border p-2 focus:outline-none rounded h-12"
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            required
            id="email"
            placeholder="votre_email@example.com"
            className="border p-2 focus:outline-none rounded h-12"
            {...registerForm('email', {
              required: 'adresse e-mail est obligatoire',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Adresse e-mail invalide',
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="password">Mot de passe</label>
          <div className="border py-1 px-2 rounded flex items-center justify-between h-12">
            <input
              required
              id="password"
              placeholder="votre mot de passe"
              type={!showPassword ? 'password' : 'text'}
              className="focus:outline-none w-full"
              {...registerForm('password', {
                required: 'Mot de passe obligatoir',
                minLength: {
                  value: 6,
                  message: "Mot de passe doit être d'au moins 6 caractères",
                },
              })}
            />
            <div className="hidden sm:block" onClick={showPasswordHandler}>
              {!showPassword ? (
                <RiEyeOffLine size={22} />
              ) : (
                <RiEyeLine size={22} />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-xs italic text-red-500">
              {errors.password.message}
            </p>
          )}
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
          to="/login"
        >
          Se connecter →
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useEffect, useState } from 'react';
import { Crown } from '@phosphor-icons/react';
import { RiEyeOffLine, RiEyeLine, RiErrorWarningLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../actions/userActions';
import { useForm } from 'react-hook-form';
import { loginType } from '../interface/interfaces';

const LoginPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userLoggedIn, error } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const redirect = search ? search.split('=')[1] : '/';

  useEffect(() => {
    if (userLoggedIn.name) navigate(redirect);
  }, [userLoggedIn]);

  const submitHandler = (data: loginType) => {
    dispatch(login(data.email, data.password));
  };

  const showPasswordHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="max-w-[400px] w-full flex flex-col sm:border p-4 rounded-md my-10 sm:bg-white sm:shadow-lg sm:shadow-gray-300 h-fit">
      <div className="w-full">
        <div className="flex m-auto justify-center items-center h-20 w-20 rounded-full ring-2 ring-emerald-600 text-emerald-600">
          <Crown size={50} />
        </div>
        <span className="block text-center mt-4">
          Veuillez connecter à votre compte
        </span>
      </div>
      <form className="my-5" onSubmit={handleSubmit(submitHandler)}>
        {error && (
          <div className="text-red-500 flex gap-2 my-2 bg-red-100 justify-center py-1">
            <RiErrorWarningLine size={22} />
            <span>{error}</span>
          </div>
        )}
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="votre_email@example.com"
            required
            autoFocus
            className="border p-2 focus:outline-none rounded h-12 bg-white sm:bg-gray-50"
            {...register('email', {
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
          <div className="border py-1 px-2 rounded flex items-center justify-between h-12 bg-white sm:bg-gray-50">
            <input
              required
              id="password"
              minLength={6}
              placeholder="votre mot de passe"
              type={!showPassword ? 'password' : 'text'}
              className="focus:outline-none w-full sm:bg-gray-50"
              {...register('password', {
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
        <button
          type="submit"
          className="w-full py-2 bg-slate-900  text-neutral-200 mt-4"
        >
          Connecter
        </button>
      </form>
      <Link
        to={search ? `/register${search}` : '/register'}
        className="w-full text-center py-2 bg-emerald-600  text-neutral-200"
      >
        S'incrire
      </Link>
    </div>
  );
};

export default LoginPage;

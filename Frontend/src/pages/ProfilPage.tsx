import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserProfile } from '../actions/userActions';
import { getUserOrders } from '../actions/orderActions';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiEmotionHappyLine,
  RiUploadCloud2Line,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';

const inputClasses =
  'border bg-gray-50 p-2 focus:outline-none rounded h-12 sm:bg-gray-50 bg-white';
const tableClasses =
  'bg-background px-2 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-6 sm:grid-cols-5 grid-cols-3 items-center justify-between';

const ProfilPage = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const { ordersList } = useAppSelector((state) => state.order);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isModifyed, setIsModifyed] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState(userLoggedIn.name);
  const [email, setEmail] = useState(userLoggedIn.email);
  const [password, setPassword] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  useEffect(() => {
    setUserImage(userLoggedIn.imageUrl);
  }, [userLoggedIn]);

  useEffect(() => {
    if (
      userName !== userLoggedIn.name ||
      email !== userLoggedIn.email ||
      password ||
      selectedFile
    ) {
      setIsModifyed(true);
    } else setIsModifyed(false);
  }, [password, userLoggedIn, userName, email, selectedFile]);

  const modifyProfilHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateUserProfile(
        userName,
        email,
        password && password,
        selectedFile && selectedFile
      )
    );

    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const showPasswordHandler = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-y-10 lg:gap-0 grid-cols-1 p-4 w-full">
      <div className="md:col-span-1 max-w-[400px] m-auto lg:m-0">
        <div>
          <h1 className="text-2xl border-l-4 border-emerald-500 px-4">
            Profile d'utilisateur
          </h1>
        </div>
        <form
          className="w-full sm:border-2 sm:p-4 my-4 rounded-md sm:bg-white"
          onSubmit={modifyProfilHandler}
        >
          <div className="flex items-end mb-4 justify-between">
            <img
              src={userImage}
              className="sm:h-32 sm:w-32 rounded-full"
              alt={`${userLoggedIn.name}'s photo`}
            />
            <button className="flex py-1 px-2 border border-slate-900 hover:text-white hover:bg-slate-900/75 gap-2 transition-all relative cursor-pointer">
              <RiUploadCloud2Line size={22} />
              <span>Changer le photo</span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="cursor-pointer absolute bottom-0 left-0 block w-full opacity-0"
              />
            </button>
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="name">Nom d'utilisateur</label>
            <input
              type="text"
              id="name"
              value={userName}
              className={inputClasses}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            disabled={!isModifyed ? true : false}
            className="active:translate-y-1 disabled:bg-neutral-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-300 active:shadow-none w-full py-2 bg-slate-900  text-neutral-200 mt-4"
          >
            Méttre à jour mon profil
          </button>
        </form>
      </div>
      <div className="md:col-span-2">
        <div>
          <h1 className="text-2xl border-l-4 border-emerald-500 px-4">
            Mes commandes
          </h1>
        </div>
        {ordersList.length ? (
          <div className="w-full border-x rounded-md mt-4">
            <div
              className={`${tableClasses} py-2 bg-slate-400 text-white rounded-t-md`}
            >
              <span className="col-span-2">ID</span>
              <span className="hidden md:block lg:hidden xl:block">Date</span>
              <span className="hidden sm:block">Prix total (Ar)</span>
              <span className="hidden sm:block">Payé</span>
              <span className="hidden md:block"></span>
            </div>
            <ul className="bg-white">
              {ordersList.map((order) => (
                <li key={order._id} className={`${tableClasses} border-b`}>
                  <span className="col-span-2">{order._id}</span>
                  <span className="hidden md:block lg:hidden xl:block">
                    {order.createdAt.substring(0, 10)}
                  </span>
                  <span className="hidden sm:block">{order.totalPrice}</span>
                  <div className="text-2xl hidden sm:block">
                    {order.isPaid ? (
                      <RiCheckboxCircleFill className="text-emerald-600" />
                    ) : (
                      <RiCloseCircleFill className="text-red-500" />
                    )}
                  </div>
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-slate-800 text-white w-full py-1 my-1">
                      Détails
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center h-full mb-4">
            <RiEmotionHappyLine size={32} />
            <p>Vous n'avez encore rien commandé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilPage;

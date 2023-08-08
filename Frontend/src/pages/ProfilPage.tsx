import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateUserProfile } from '../actions/userActions';

const inputClasses =
  'border bg-gray-50 p-2 focus:outline-none rounded h-12 sm:bg-gray-50 bg-white';
const tableClasses =
  'bg-background p-2 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between';

const ProfilPage = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isModifyed, setIsModifyed] = useState(false);
  const [userImage, setUserImage] = useState(userLoggedIn.imageUrl);
  const [userName, setUserName] = useState(userLoggedIn.name);
  const [email, setEmail] = useState(userLoggedIn.email);
  const [password, setPassword] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);

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
          <img
            src={userImage}
            className="sm:h-32 sm:w-32 mb-4 rounded-full"
            alt="user photo"
          />
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
          <div>
            <label htmlFor="upload">Télécharger une image</label>
            <input
              id="upload"
              accept="image/*"
              type="file"
              ref={inputFileRef}
              onChange={handleImageChange}
              className="w-full"
            />
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

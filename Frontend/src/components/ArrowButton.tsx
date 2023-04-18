import { ArrowUp } from '@phosphor-icons/react';

const ArrowButton = () => {
  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={clickHandler}
      className="w-10 h-10 rounded-full fixed bottom-5 right-5 bg-emerald-600 flex justify-center items-center"
    >
      <ArrowUp size={24} color="white" />
    </button>
  );
};

export default ArrowButton;

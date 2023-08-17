import { useEffect } from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts } from '../actions/productActions';

const HomePage = () => {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className="max-w-[1020px] h-fit">
      <Carousel />
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center mt-10 mx-auto">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

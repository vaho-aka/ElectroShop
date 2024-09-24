import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts } from '../actions/productActions';
import { Item } from '../interface/interfaces';

const HomePage = () => {
  const { products, search } = useAppSelector((state) => state.products);
  const [productToDisplay, setProductToDisplay] = useState<Item[]>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    setProductToDisplay(search.length ? search : products);
  }, [search, products]);

  return (
    <div className="max-w-[1020px] h-fit">
      <Carousel />
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center mt-10 mx-auto">
        {productToDisplay?.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

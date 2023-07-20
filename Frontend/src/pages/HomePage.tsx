import Card from '../components/Card';
import Carousel from '../components/Carousel';
import { useAppSelector } from '../hooks';

const HomePage = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <>
      <Carousel slides={['1', '2', '3']} slidesToShow={1} />
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center mt-10 max-w-[1020px] mx-auto">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default HomePage;

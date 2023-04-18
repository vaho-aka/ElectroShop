import Card from '../components/Card';
import { useAppSelector } from '../hooks';

const HomePage = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default HomePage;

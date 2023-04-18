import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const SignPage = lazy(() => import('../pages/SignPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ShippingPage = lazy(() => import('../pages/ShippingPage'));
const PlaceOrderPage = lazy(() => import('../pages/PlaceOrderPage'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:productId" element={<ProductPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
      </Router>
    </Suspense>
  );
};

export default Routes;

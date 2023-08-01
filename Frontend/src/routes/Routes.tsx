import { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import PrivateRoutes from './PrivateRoutes';
import ProfilPage from '../pages/ProfilPage';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const SignPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const ShippingPage = lazy(() => import('../pages/ShippingPage'));
const PlaceOrderPage = lazy(() => import('../pages/PlaceOrderPage'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/user/:id"
          element={
            <PrivateRoutes>
              <ProfilPage />
            </PrivateRoutes>
          }
        />
        <Route path="/details/:productId" element={<ProductPage />} />
        <Route path="/login" element={<SignPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/shipping"
          element={
            <PrivateRoutes>
              <ShippingPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/placeorder"
          element={
            <PrivateRoutes>
              <PlaceOrderPage />
            </PrivateRoutes>
          }
        />
      </Router>
    </Suspense>
  );
};

export default Routes;

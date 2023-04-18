import React, { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import Stepper from '../components/Stepper.jsx';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const ProductPage = lazy(() => import('../pages/ProductPage.jsx'));
const SignPage = lazy(() => import('../pages/SignPage.jsx'));
const RegisterPage = lazy(() => import('../pages/RegisterPage.jsx'));
const ShippingPage = lazy(() => import('../pages/ShippingPage.jsx'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/details/:productId" element={<ProductPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/shipping"
          element={
            <Stepper>
              <ShippingPage />
            </Stepper>
          }
        />
      </Router>
    </Suspense>
  );
};

export default Routes;

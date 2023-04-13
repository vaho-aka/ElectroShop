import React, { Suspense, lazy } from 'react';
import { Routes as Router, Route } from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = lazy(() => import('../pages/HomePage.jsx'));
const ProductPage = lazy(() => import('../pages/ProductPage.jsx'));
const SignPage = lazy(() => import('../pages/SignPage.jsx'));

const Routes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Router>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/details/:productId" element={<ProductPage />} />
        <Route path="/sign" element={<SignPage />} />
      </Router>
    </Suspense>
  );
};

export default Routes;

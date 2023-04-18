import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// * @Reducers
import { productReducer } from './reducers/productReducer.js';
import { cartReducer } from './reducers/cartReducer.js';

const middleware = [thunk];

const initialState = {
  userLoggedIn: { userInfo: null },
};

const store = configureStore(
  {
    reducer: {
      products: productReducer,
      cart: cartReducer,
    },
  },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

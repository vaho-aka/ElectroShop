import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// * @Reducers
import productReducer from './reducers/productReducer.js';
import cartReducer from './reducers/cartReducer.js';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

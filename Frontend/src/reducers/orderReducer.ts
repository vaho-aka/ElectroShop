import { createSlice } from '@reduxjs/toolkit';
import { CartItem, OrderState } from '../interface/interfaces';

const initialState: OrderState = {
  orderDetails: {},
  loading: false,
  error: '',
};

export const order = createSlice({
  name: 'order',
  initialState,
  reducers: {
    GET_ORDER_DETAILS_REQUEST(state) {
      state.loading = true;
    },
    GET_ORDER_DETAILS_SUCCESS(state, action) {
      state.loading = false;
      state.orderDetails = action.payload;
      state.error = '';
    },
    GET_ORDER_DETAILS_FAIL(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderReducer = order.reducer;
export const orderActions = order.actions;

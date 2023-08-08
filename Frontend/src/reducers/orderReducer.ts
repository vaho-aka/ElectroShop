import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, OrderState } from '../interface/interfaces';

const initialState: OrderState = {
  orderItems: [],
  ordersList: [],
  loading: false,
  error: '',
};

const orderReducer = createSlice({
  name: 'order',
  initialState,
  reducers: {
    GET_ORDER_DETAILS_REQUEST(state) {
      state.loading = true;
    },
    GET_ORDER_DETAILS_SUCCESS(state, action: PayloadAction<any>) {
      state.loading = false;
      state.orderItems = action.payload;
      state.error = '';
    },
    GET_ORDER_LIST_SUCCESS(state, action: PayloadAction<any>) {
      state.loading = false;
      state.ordersList = action.payload;
      state.error = '';
    },
    GET_ORDER_DETAILS_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderActions = orderReducer.actions;
export default orderReducer.reducer;

import axios from 'axios';
import { orderActions } from '../reducers/orderReducer';
import { AppThunk } from '../store';
import { OrderState } from '../interface/interfaces';
import { cartActions } from '../reducers/cartReducer';

export const placeOrder =
  (order: any): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderActions.GET_ORDER_DETAILS_REQUEST());

      const { userLoggedIn } = getState().user;

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userLoggedIn.token}`,
        },
      };

      const { data } = await axios.post('/api/v1/order', order, config);
      dispatch(orderActions.GET_ORDER_DETAILS_SUCCESS(data));
      dispatch(cartActions.RESET_CART_AND_SHIPPING_ADDRESS());
      localStorage.removeItem('electroshop-user-cart');
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderActions.GET_ORDER_DETAILS_FAIL(message));
    }
  };

export const getUserOrders = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(orderActions.GET_ORDER_DETAILS_REQUEST());

    const { userLoggedIn } = getState().user;

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userLoggedIn.token}`,
      },
    };

    const { data } = await axios.get('/api/v1/order', config);
    dispatch(orderActions.GET_ORDER_LIST_SUCCESS(data));
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(orderActions.GET_ORDER_DETAILS_FAIL(message));
  }
};

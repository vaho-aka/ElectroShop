import axios from 'axios';
import { productActions } from '../reducers/productReducer';
import { Item } from '../interface/interfaces';
import { AppThunk } from '../store';

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productActions.GET_PRODUCT_REQUEST());

    const { data } = await axios.get<Item[]>('/api/product');
    dispatch(productActions.GET_PRODUCT_SUCCESS(data));
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(productActions.GET_PRODUCT_FAIL(message));
  }
};

export const getProductById =
  (id?: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());

      const { data } = await axios.get<Item>(`/api/product/${id}`);
      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productActions.GET_PRODUCT_FAIL(message));
    }
  };

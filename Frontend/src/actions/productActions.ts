import axios from 'axios';
import { productActions } from '../reducers/productReducer';
import { Item } from '../interface/interfaces';
import { AppThunk } from '../store';

export const getProducts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(productActions.GET_PRODUCT_REQUEST());

    const { data } = await axios.get<Item[]>('/api/v1/product');
    dispatch(productActions.GET_PRODUCT_SUCCESS(data));
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(productActions.GET_PRODUCT_FAIL(message));
  }
};

export const getSearchProducts =
  (keyword: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());

      const { data } = await axios.get<Item[]>(
        `/api/v1/product?keyword=${keyword}`
      );

      dispatch(productActions.GET_SEARCH_PRODUCT(data));
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

      const { data } = await axios.get(`/api/v1/product/${id}`);
      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productActions.GET_PRODUCT_FAIL(message));
    }
  };

export const rateProduct =
  (id: string, comment: string, rating: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(productActions.GET_PRODUCT_REQUEST());
      const { userLoggedIn } = getState().user;

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userLoggedIn.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/product/${id}/review`,
        { comment, rating },
        config
      );
      dispatch(productActions.GET_PRODCUT_BY_ID_SUCCESS(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productActions.GET_PRODUCT_FAIL(message));
    }
  };

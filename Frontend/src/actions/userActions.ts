import axios from 'axios';
import { User } from '../interface/interfaces';
import { AppThunk } from '../store';
import { userActions } from '../reducers/userReducer';

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post<User>(
        '/api/v1/user/login',
        {
          email,
          password,
        },
        config
      );
      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('electroshop-user-info', JSON.stringify(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(userActions.GET_USER_REQUEST());

    await axios.get('/api/v1/user/logout');
    dispatch(userActions.USER_LOG_OUT());
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch(userActions.GET_USER_FAIL(message));
  }
};

export const register =
  (userName: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const { data } = await axios.post<User>(
        '/api/v1/user/signup',
        {
          userName,
          email,
          password,
        },
        config
      );
      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('electroshop-user-info', JSON.stringify(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

export const updateUserProfile =
  (name: string, email: string, password?: string, image?: File): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(userActions.GET_USER_REQUEST());

      const { userLoggedIn } = getState().user;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userLoggedIn.token,
        },
      };

      const { data } = await axios.put<User>(
        '/api/v1/user/profil',
        { name, email, password, image },
        config
      );
      dispatch(userActions.GET_USER_SUCCESS(data));
      localStorage.setItem('electroshop-user-info', JSON.stringify(data));
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

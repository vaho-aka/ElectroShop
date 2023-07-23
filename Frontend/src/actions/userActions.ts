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
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userActions.GET_USER_FAIL(message));
    }
  };

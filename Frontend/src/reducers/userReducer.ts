import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../interface/interfaces';

const userInfoFromStorage: User = localStorage.getItem('electroshop-user-info')
  ? JSON.parse(localStorage.getItem('electroshop-user-info') || '')
  : {
      _id: '',
      name: '',
      email: '',
      isAdmin: false,
      imageUrl: '',
      token: '',
    };

const initialState: UserState = {
  userLoggedIn: userInfoFromStorage,
  loading: false,
  error: '',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    GET_USER_REQUEST(state) {
      state.loading = true;
    },
    GET_USER_SUCCESS(state, action: PayloadAction<User>) {
      state.loading = false;
      state.userLoggedIn = action.payload;
      state.error = '';
    },
    GET_USER_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    USER_LOG_OUT(state) {
      state.loading = false;
      state.userLoggedIn = {
        _id: '',
        name: '',
        email: '',
        isAdmin: false,
        imageUrl: '',
        token: '',
      };

      localStorage.removeItem('electroshop-user-info');
    },
  },
});

export const userActions = userReducer.actions;
export default userReducer.reducer;

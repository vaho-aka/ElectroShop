import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserState } from '../interface/interfaces';

const initialState: UserState = {
  userLoggedIn: {
    _id: '',
    name: '',
    email: '',
    isAdmin: false,
    profilePicture: '',
    token: '',
  },
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
  },
});

export const userActions = userReducer.actions;
export default userReducer.reducer;

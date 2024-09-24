import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductState, Item, Review } from '../interface/interfaces';

const initialState: ProductState = {
  products: [],
  search: [],
  product: {
    _id: '',
    name: '',
    price: 0,
    description: '',
    brand: '',
    category: '',
    countInStock: 0,
    imageUrl: '',
    rating: 0,
    numReviews: 0,
  },
  reviews: [],
  message: '',
  loading: false,
  error: '',
};

const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    GET_PRODUCT_REQUEST(state) {
      state.loading = true;
    },
    GET_PRODUCT_SUCCESS(state, action: PayloadAction<Item[]>) {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    },
    GET_PRODCUT_BY_ID_SUCCESS(
      state,
      action: PayloadAction<{ product: Item; reviews: Array<Review> }>
    ) {
      state.loading = false;
      state.product = action.payload.product;
      state.reviews = action.payload.reviews;
      state.error = '';
    },
    GET_PRODUCT_FAIL(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    GET_SEARCH_PRODUCT(state, action: PayloadAction<Item[]>) {
      state.loading = false;
      state.search = action.payload;
    },
  },
});

export const productActions = productReducer.actions;
export default productReducer.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    shippingAddress: {},
    showCart: false,
    totalAmount: 0,
  },
  reducers: {
    ADD_ITEM(state, action) {
      const price = +action.payload.price.split(' ').join('');

      const existItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      const existItem = state.items[existItemIndex];

      if (!existItem) {
        state.totalAmount = state.totalAmount + price * action.payload.amount;
        state.items = [...state.items, action.payload];
      } else {
        const updatedItem = {
          ...existItem,
          amount: existItem.amount + action.payload.amount,
        };

        if (updatedItem.amount <= updatedItem.countInStock) {
          state.totalAmount = state.totalAmount + price * action.payload.amount;
          state.items[existItemIndex] = updatedItem;
        }
      }
    },
    REMOVE_ITEM(state, action) {
      const itemToRemoveIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );

      const itemToRemove = state.items[itemToRemoveIndex];
      const price = +itemToRemove.price.split(' ').join('');
      state.totalAmount -= price;

      const updatedItem = {
        ...itemToRemove,
        amount: itemToRemove.amount - 1,
      };

      let updatedItems;
      if (updatedItem.amount < 1) {
        state.items = state.items.filter(
          (item) => item._id !== updatedItem._id
        );
      } else {
        updatedItems = [...state.items];
        updatedItems[itemToRemoveIndex] = updatedItem;

        state.items = updatedItems;
      }
    },
    SHOW_CART(state) {
      state.showCart = !state.showCart;
    },
    ADD_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
    },
  },
});

export const cartActions = cart.actions;
export const cartReducer = cart.reducer;

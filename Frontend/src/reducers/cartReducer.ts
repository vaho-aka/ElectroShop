import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, ShippingAddress } from '../interface/interfaces';

const initialState: CartState = {
  items: [],
  shippingAddress: {
    address: '',
    city: '',
    neighbour: '',
    paymentMethod: '',
    phoneNumber: '',
  },
  showCart: false,
  totalAmount: 0,
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_ITEM(state, action: PayloadAction<CartItem>) {
      const price = +action.payload.price.split(' ').join('');

      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      const existItem = state.items[itemIndex];

      if (!existItem) {
        state.totalAmount = state.totalAmount + price * action.payload.amount;
        state.items = [...state.items, action.payload];
      } else {
        const amountFree = existItem.countInStock - existItem.amount;

        const amount =
          existItem.countInStock >= existItem.amount + action.payload.amount
            ? existItem.amount + action.payload.amount
            : existItem.amount + amountFree;

        const updateItem = {
          ...action.payload,
          amount,
        };

        state.totalAmount = state.totalAmount + price * amount;
        state.items[itemIndex] = updateItem;
      }
      localStorage.setItem('electroshop-products', JSON.stringify(state.items));
    },
    REMOVE_ITEM(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload
      );

      console.log(action.payload);
      const itemToRemove = state.items[itemIndex];

      const price = +itemToRemove.price.split(' ').join('');
      state.totalAmount -= price;

      const updatedItem = {
        ...itemToRemove,
        amount: itemToRemove.amount - 1,
      };

      let updatedItems: Array<CartItem>;

      if (updatedItem.amount < 1) {
        state.items = state.items.filter(
          (item) => item._id !== updatedItem._id
        );
      } else {
        updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;

        state.items = updatedItems;
      }

      if (state.items.length <= 0)
        localStorage.removeItem('electroshop-products');
    },
    SHOW_CART(state) {
      state.showCart = !state.showCart;
    },
    ADD_SHIPPING_ADDRESS(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
  },
});

export const cartActions = cartReducer.actions;
export default cartReducer.reducer;

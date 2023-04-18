import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../models/Model';

interface ShippingAddress {
  address: string;
  city: string;
  neighbour: string;
  paymentMethod: string;
}

interface CartState {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  showCart: boolean;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  shippingAddress: {
    address: '',
    city: '',
    neighbour: '',
    paymentMethod: '',
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
        const updateItem = {
          ...action.payload,
          amount: existItem.amount + action.payload.amount,
        };

        if (updateItem.amount <= updateItem.countInStock) {
          state.totalAmount = state.totalAmount + price * action.payload.amount;
          state.items[itemIndex] = updateItem;
        }
      }
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

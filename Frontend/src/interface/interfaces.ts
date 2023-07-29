export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  imageUrl: string;
  token: string;
}

export interface Item {
  _id: string;
  name: string;
  price: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  imageUrl: string;
}

export interface CartItem extends Item {
  amount: number;
}

export interface ShippingAddressType {
  address: string;
  city: string;
  neighbour: string;
  paymentMethod: string;
  phoneNumber: string;
}

export interface CartState {
  items: CartItem[];
  shippingAddress: ShippingAddressType;
  showCart: boolean;
  totalAmount: number;
}

export interface State {
  loading: boolean;
  error: string;
}

export interface OrderState extends State {
  orderDetails: CartItem | any;
}

export interface ProductState extends State {
  products: Array<Item>;
  product: Item;
}

export interface UserState extends State {
  userLoggedIn: User;
}

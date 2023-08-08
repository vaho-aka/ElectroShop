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
  rating: number;
  numReviews: number;
}

export interface Review {
  _id: string;
  user: User;
  rating: number;
  comment: string;
}

export interface CartItem {
  product: Item;
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

export interface OrderItem {
  qty: number;
  image: string;
  price: string;
  product: Item;
}

export interface OrderState extends State {
  orderItems: OrderItem[];
  ordersList: {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddressType;
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    createdAt: string;
  }[];
}

export interface ProductState extends State {
  products: Array<Item>;
  product: Item;
  reviews: Array<Review>;
  message: string;
}

export interface UserState extends State {
  userLoggedIn: User;
}

export interface loginType {
  email: string;
  password: string;
}

export interface registerType extends loginType {
  username: string;
}

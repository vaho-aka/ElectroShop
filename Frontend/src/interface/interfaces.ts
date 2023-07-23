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

export interface ShippingAddress {
  address: string;
  city: string;
  neighbour: string;
  paymentMethod: string;
  phoneNumber: string;
}

export interface CartState {
  items: CartItem[];
  shippingAddress: ShippingAddress;
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

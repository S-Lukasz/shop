import { Dispatch, SetStateAction } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  amount: number;
  product: Product;
}

export interface CartContext {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

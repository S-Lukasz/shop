"use client";

import { createContext, useState } from "react";
import { MainContext, CartItem, Product } from "@/types";

export const Context = createContext<MainContext>({
  isFetched: false,
  cartItems: [],
  setCartItems: () => {},
  setFetch: () => {},
  addItemToCart: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maxAmount = 99;
  const [isFetched, setFetch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItemToCart = (amount: number, product: Product) => {
    const cartItem: CartItem = { amount: amount, product };
    const foundItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id,
    );

    if (foundItemIndex !== -1) {
      const array = cartItems.slice();
      cartItem.amount += cartItems[foundItemIndex].amount;

      if (cartItem.amount > maxAmount) cartItem.amount = maxAmount;

      array[foundItemIndex] = cartItem;
      setCartItems(array);
      return;
    }

    setCartItems([cartItem, ...cartItems]);
  };

  return (
    <Context.Provider
      value={{ isFetched, cartItems, setCartItems, setFetch, addItemToCart }}
    >
      {children}
    </Context.Provider>
  );
}

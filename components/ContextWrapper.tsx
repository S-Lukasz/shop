"use client";

import { createContext, useState } from "react";
import { CartContext, CartItem } from "@/types";

export const Context = createContext<CartContext>({
  cartItems: [],
  setCartItems: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <Context.Provider value={{ cartItems, setCartItems }}>
      {children}
    </Context.Provider>
  );
}

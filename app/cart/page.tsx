"use client";

import { useContext, useMemo } from "react";
import { Context } from "@/components/ContextWrapper";
import CartProduct from "@/components/CartProduct";

export default function About() {
  const { cartItems } = useContext(Context);

  const productItems = useMemo(() => {
    if (cartItems.length > 0) {
      return cartItems.map((item) => (
        <CartProduct
          key={"productKey_" + item.product.id}
          cartItem={item}
        ></CartProduct>
      ));
    } else {
      return (
        <div className="flex w-full gap-2 rounded-lg bg-white p-6 pl-4 shadow-md ">
          <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
            No items in cart
          </p>
        </div>
      );
    }
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    let result = 0;
    for (const cartItem of cartItems) {
      result += cartItem.amount * cartItem.product.price;
    }
    return result;
  }, [cartItems]);

  return (
    <div className=" mb-10 flex h-full w-full flex-col items-center">
      <div className=" my-12 flex w-1/2 flex-col gap-8 ">{productItems}</div>
      <div className="flex w-1/2 justify-end gap-16 rounded-lg bg-white p-6 pl-4 pr-28 shadow-md">
        <button
          className="bold text-md m-auto flex rounded-lg bg-blue-500 px-8 py-1
            text-center font-semibold text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] 
            hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
        >
          Order
        </button>
        <p className=" pr- line-clamp-1 h-[1lh] text-xl font-semibold">
          Total price:
        </p>
        <p className=" pr- line-clamp-1 h-[1lh] text-xl font-semibold">
          {totalPrice.toFixed(2)} $
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Context } from "@/components/ContextWrapper";
import { useContext, useMemo, useState } from "react";

interface Page {
  name: string;
  path: string;
}

export default function Header() {
  const { cartItems, setCartItems } = useContext(Context);

  const getItemsAmount = useMemo(() => {
    let result = 0;
    for (const cartItem of cartItems) {
      result += cartItem.amount;
    }
    return result;
  }, [cartItems]);

  const PAGES: Page[] = [
    {
      name: "Menu",
      path: "/",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Cart",
      path: "/cart",
    },
  ];

  return (
    <header className="sticky top-0 z-10 flex w-full flex-col bg-white shadow-md">
      <div className="flex bg-gray-900 pt-5"></div>

      <div className="flex">
        <div className="flex h-16 items-center bg-white text-center ">
          <div className="flex items-center divide-x-2 divide-gray-300 text-center text-2xl font-bold ">
            {PAGES.map((result, i) => (
              <Link key={"pageKey_" + i} className=" px-10 " href={result.path}>
                <p className="transform text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-blue-600 motion-reduce:transform-none ">
                  {result.name}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-auto mr-10 flex ">
          <div className="my-4 mr-8 flex border-l-2 border-gray-300"></div>
          <Link
            href="/cart"
            className="m-auto flex transform text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-blue-600 motion-reduce:transform-none "
          >
            <FontAwesomeIcon
              className="h-[28px] w-[28px]"
              icon={faCartShopping}
            />
          </Link>
          <div className="relative right-3 flex">
            <div className=" text-md absolute mt-2 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border-[3px] border-gray-700 bg-white p-[2px] text-center font-bold text-black">
              {getItemsAmount}
            </div>
          </div>
        </div>
      </div>

      <div className=" border-b-2 border-gray-400"> </div>
    </header>
  );
}

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
    <header className="flex-col">
      <div className="flex bg-black pt-5"></div>

      <div className="flex">
        <div className="flex h-16 items-center bg-white text-center">
          <div className="flex items-center divide-x-2 divide-gray-300 text-center text-2xl font-bold ">
            {PAGES.map((result) => (
              <Link className=" px-10 " href={result.path}>
                <p className="transform text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none ">
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
            className="m-auto flex transform text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none "
          >
            <FontAwesomeIcon className="h-6 w-6" icon={faCartShopping} />
          </Link>
          <div className="relative flex">
            <div className="absolute flex font-semibold">{getItemsAmount}</div>
          </div>
        </div>
      </div>

      <div className=" border-b-2 border-gray-400"> </div>
    </header>
  );
}

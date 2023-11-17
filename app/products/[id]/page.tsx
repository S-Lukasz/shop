"use client";

import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { Product as ProductType } from "@/types";
import { Context } from "@/components/ContextWrapper";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const amounts = new Array(99)
    .fill(0)
    .map((_, i) => <option key={"amountKey_" + i}>{i + 1}</option>);
  const { setFetch, addItemToCart } = useContext(Context);

  const [product, setProduct] = useState<ProductType>();
  const [amount, setAmount] = useState<number>(1);

  const rateStars = useMemo(() => {
    if (product === undefined) return;

    const starCount = parseInt(product.rating.rate.toString());
    const stars = new Array(5).fill(0).map((_, i) => {
      const starColor = i <= starCount ? " text-yellow-300 " : "text-gray-300";
      return (
        <FontAwesomeIcon
          key={"starIconKey_" + i}
          className={starColor}
          icon={faStar}
        />
      );
    });
    return stars;
  }, [product]);

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(event.target.value));
  };

  useEffect(() => {
    setFetch(false);

    const initialFetch = async () => {
      const result = await fetch(
        "https://fakestoreapi.com/products/" + params.id,
      );
      const product = await result.json();
      setProduct(product);
      setFetch(true);
    };

    initialFetch();
  }, []);

  return (
    // product ? <Product product={product}></Product> : <p>No item available</p>
    <div className="m-auto flex py-10">
      <div className="m-auto flex h-1/3 w-2/3 justify-center gap-4">
        <div className="flex justify-center rounded-lg bg-white shadow-md">
          <Image
            className="max-h-sm flex max-w-sm flex-shrink-0 flex-grow-0 rounded-lg bg-white object-contain object-center p-20"
            src={product?.image ?? ""}
            alt="proj"
          />
        </div>

        <div className="flex w-[42rem] flex-col gap-6">
          <div className="flex">
            <div className="h-full w-[42rem] rounded-lg bg-white pb-8 shadow-md">
              <p className=" m-4 text-2xl font-semibold">{product?.title}</p>

              <div className=" ml-6 flex h-2 items-center gap-2">
                <p className=" flex text-lg font-semibold  ">{rateStars}</p>
                <Link
                  href="/"
                  className=" flex text-lg font-medium text-blue-400 hover:text-blue-800 hover:underline"
                >
                  {"(" + product?.rating.count + ")"}
                </Link>
              </div>

              <div className="mt-12 flex w-full flex-col justify-center gap-6">
                <p className="m-2 text-center text-2xl font-semibold">
                  {product?.price} $
                </p>
                <div className="flex w-full justify-center gap-6">
                  <select
                    onChange={onAmountChange}
                    className="bold text-md rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md"
                  >
                    {amounts}
                  </select>
                  <button
                    onClick={() => {
                      if (product !== undefined) addItemToCart(amount, product);
                    }}
                    className="bold text-md flex rounded-lg bg-blue-500 px-8 py-1 text-center font-semibold 
                  text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-[42rem] flex-col items-center justify-center gap-4 rounded-lg bg-white py-12 shadow-md">
            <p className="z-[2] w-full text-center text-2xl font-bold capitalize">
              Description
            </p>
            <p className="z-[2] w-full px-14 text-xl capitalize">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* 
<div className="flex">
<div className="m-auto flex gap-8">
<div className=" m-80 w-80 rounded-lg bg-white p-8 shadow-md">
  <img
    className="m-auto flex flex-shrink-0 flex-grow-0 rounded-lg 
      bg-white object-contain object-center p-4 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none "
    src={product?.image}
    alt="proj"
  />
</div>

<div className="m-auto flex h-80 w-2/3 flex-col rounded-lg bg-white shadow-md">
  <p className=" m-4 text-2xl font-semibold">{product?.title}</p>

  <div className=" ml-6 flex items-center gap-2">
    <p className=" flex text-lg font-semibold  ">{rateStars}</p>
    <Link
      href="/"
      className=" flex text-lg font-medium text-blue-400 hover:text-blue-800 hover:underline"
    >
      {"(" + product?.rating.count + ")"}
    </Link>
  </div>

  <div className="mt-24 flex w-full justify-center gap-6">
    <select
      onChange={onAmountChange}
      className="bold text-md rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md"
    >
      {amounts}
    </select>
    <button
      onClick={() => {
        if (product !== undefined) addItemToCart(amount, product);
      }}
      className="bold text-md flex rounded-lg bg-blue-500 px-8 py-1 text-center font-semibold 
      text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
    >
      ADD TO CART
    </button>
  </div>
</div>
</div>
</div> */
}

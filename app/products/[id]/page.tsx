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
  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
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
      const productFetch = await fetch(
        "https://fakestoreapi.com/products/" + params.id,
      );

      const productResult: ProductType = await productFetch.json();
      const categoryProductsResult = await fetch(
        "https://fakestoreapi.com/products/category/" + productResult.category,
      );

      const categoryProducts = await categoryProductsResult.json();

      setCategoryProducts(categoryProducts);
      setProduct(productResult);
      setFetch(true);
    };

    initialFetch();
  }, [params.id, setFetch]);

  return (
    // product ? <Product product={product}></Product> : <p>No item available</p>
    <div className="m-auto flex flex-col gap-4 py-12">
      <div>
        <p className="margin-auto text-md flex gap-2 rounded-lg bg-white p-4 pl-6 font-medium capitalize shadow-md ">
          <Link href={"/"} className="text-gray-500 hover:text-blue-500">
            menu
          </Link>
          /
          <Link href={"/"} className="text-gray-500 hover:text-blue-500">
            {product?.category}
          </Link>
          /<p>{product?.title}</p>
        </p>
      </div>
      <div>
        <div className="m-auto flex h-1/3 w-2/3 justify-center gap-4">
          <div className="flex justify-center rounded-lg bg-white shadow-md">
            <Image
              className="max-h-sm flex max-w-sm flex-shrink-0 flex-grow-0 rounded-lg bg-white object-contain object-center p-20"
              loader={() => product?.image ?? ""}
              src={product?.image ?? ""}
              height={380}
              width={380}
              alt="proj"
            />
          </div>

          <div className="flex w-[42rem] flex-col gap-4">
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
                        if (product !== undefined)
                          addItemToCart(amount, product);
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
              <p className="flex w-full divide-x-2 divide-gray-600 text-center text-xl font-semibold capitalize">
                <button className="flex grow items-center justify-center capitalize text-blue-500">
                  Description
                </button>
                <button className="flex grow items-center justify-center capitalize text-gray-500 hover:text-blue-500">
                  Details
                </button>
                <button className="flex grow items-center justify-center capitalize text-gray-500 hover:text-blue-500">
                  Opinions
                </button>
              </p>
              <p className="mx-6 border-t-2 border-gray-300 px-14 pt-6 text-xl capitalize">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="margin-auto text-md mt-4 flex flex-col rounded-lg bg-white pb-6 shadow-md">
          <p className="w-full p-4 text-center text-lg font-medium capitalize">
            Similar products
          </p>

          <div className="flex w-full ">
            {categoryProducts.map((product, i) => {
              return (
                <Link
                  key={"categoryProductKey_" + i}
                  href={`/products/${product?.id}`}
                  className="flex w-full justify-around px-10"
                >
                  <Image
                    className=" flex rounded-lg object-contain object-center p-2 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none"
                    loader={() => product.image}
                    src={product.image}
                    width={90}
                    height={90}
                    alt="proj"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

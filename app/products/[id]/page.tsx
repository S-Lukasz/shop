"use client";

import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { Product as ProductType } from "@/types";
import { Context } from "@/components/ContextWrapper";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WindowContainer from "@/components/WindowContainer";
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
    <div className="m-auto flex w-full flex-col justify-center gap-4 py-12 xl:w-3/5">
      <div className="flex justify-center">
        <p className="text-md m-auto flex w-11/12 gap-2 rounded-lg bg-white p-4 pl-6 font-medium capitalize shadow-md  ">
          <Link href={"/"} className="text-gray-500 hover:text-blue-500">
            menu
          </Link>
          /
          <Link
            href={"/"}
            className="line-clamp-1 h-[1lh] text-gray-500 hover:text-blue-500 "
          >
            {product?.category}
          </Link>
          /<p className="line-clamp-1 h-[1lh]">{product?.title}</p>
        </p>
      </div>
      <div className=" flex h-full w-full flex-col items-center justify-center">
        <div className="m-auto flex w-11/12 flex-col items-center justify-center gap-4 xl:flex-row">
          <div className="flex flex-col gap-4 ">
            <div className="flex w-full">
              <WindowContainer className="h-full w-full pb-8 ">
                <p className=" m-4 text-2xl font-semibold">{product?.title}</p>

                <div className=" ml-6 flex h-2 items-center gap-2 ">
                  <p className=" flex text-lg font-semibold  ">{rateStars}</p>
                  <Link
                    href="/"
                    className=" flex text-lg font-medium text-blue-400 hover:text-blue-800 hover:underline"
                  >
                    {"(" + product?.rating.count + ")"}
                  </Link>
                </div>

                <div className="mx-10 flex justify-center">
                  <Image
                    className="mt-4 flex flex-shrink-0 rounded-lg object-contain object-center p-6 xl:mt-0 xl:p-2"
                    loader={() => product?.image ?? ""}
                    src={product?.image ?? ""}
                    height={240}
                    width={240}
                    alt="proj"
                  />
                </div>

                <div className="mt-4 flex w-full flex-col justify-center gap-6 xl:mt-12">
                  <p className="text-line m-auto flex gap-4 text-center text-3xl font-bold">
                    <p className="text-gray-600  line-through">
                      {((product?.price ?? 1) * 1.2).toFixed(2)} $
                    </p>
                    <p>{product?.price} $</p>
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
                      className="btn-primary bold text-md flex rounded-lg px-8 py-1 font-semibold hover:bg-blue-100"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </WindowContainer>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white py-12 shadow-md">
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
              <p className="border-t-2 border-gray-300 px-14 pt-6 text-xl capitalize xl:mx-6">
                {product?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="margin-auto text-md mt-4 flex w-11/12 flex-col items-center justify-center rounded-lg bg-white pb-6 shadow-md ">
          <p className="w-11/12 border-b-2 border-gray-300 pb-2 pt-4 text-center text-lg font-medium capitalize">
            Similar products
          </p>

          <div className="mt-4 flex w-full items-center xl:mt-6 ">
            {categoryProducts.map((product, i) => {
              return (
                <Link
                  key={"categoryProductKey_" + i}
                  href={`/products/${product?.id}`}
                  className="flex w-full justify-around px-2 xl:px-10"
                >
                  <Image
                    className=" flex rounded-lg object-contain object-center p-4 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none xl:p-2"
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

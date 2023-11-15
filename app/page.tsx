"use client";

import { useEffect, useMemo, useState } from "react";
import { Product as ProductType } from "@/types";
import Product from "@/components/Product";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const productItems = useMemo(() => {
    return products.map((result) => <Product product={result}></Product>);
  }, [products]);

  useEffect(() => {
    const test = async () => {
      const promises = await Promise.all([
        fetch("https://fakestoreapi.com/products"),
        fetch("https://fakestoreapi.com/products/categories"),
      ]);

      const [products, categories] = await Promise.all(
        promises.map((promise) => promise.json()),
      );

      setProducts(products);
      setCategories(categories);
    };

    test();
  }, []);

  return (
    <div className=" flex ">
      <div className=" flex w-1/6 flex-col bg-slate-100 px-8 pt-10">
        <p className=" text-lg font-bold">Categories</p>
        <ul>
          {categories.map((category) => (
            <li className="transform text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none ">
              <Link className="pl-4 capitalize " href="/">
                {category}
              </Link>
            </li>
          ))}
        </ul>
        <p className=" mt-4 text-lg font-bold">Price</p>
        <div className="flex items-center gap-4 pl-4 pt-2">
          <input
            className="bold text-md w-1/3 rounded-lg px-4 py-1 text-center font-semibold shadow-md "
            placeholder="min"
            type="number"
          />
          <span className="text-md font-semibold">-</span>
          <input
            className="bold text-md w-1/3 rounded-lg px-4 py-1 text-center font-semibold shadow-md"
            placeholder="max"
            type="number"
          />
          <span className="text-md font-semibold">$</span>
        </div>
        <button
          className="bold text-md mx-12 mt-10 flex rounded-lg bg-blue-500 px-4 py-1 text-center font-semibold text-white 
          shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
        >
          FILTER
        </button>
      </div>
      <div className=" flex w-5/6 flex-col items-center bg-white">
        <div className=" my-12 flex w-5/6 flex-col gap-8">
          {/* <p className="  text-2xl font-semibold mt-5">Our products:</p> */}
          {productItems}
        </div>
      </div>
    </div>
  );
}

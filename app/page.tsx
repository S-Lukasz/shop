"use client";

import {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product as ProductType } from "@/types";
import Product from "@/components/Product";
import { Context } from "@/components/ContextWrapper";

export default function Home() {
  const { setFetch } = useContext(Context);
  const [filterItems, setFilteredItems] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentCategory, setCategory] = useState("All");
  const [isFilterSet, setFilter] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const onPriceFilter = useCallback(() => {
    if (minPrice == 0 && maxPrice == 0) return products;

    setFilter(true);
    const productsFiltered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );
    setFilteredItems(productsFiltered);
  }, [maxPrice, minPrice, products]);

  useEffect(() => {
    onPriceFilter();
  }, [onPriceFilter, products]);

  const productItems = useMemo(() => {
    const productsToDisplay = isFilterSet ? filterItems : products;

    if (productsToDisplay.length == 0) {
      return (
        <div className="flex w-full gap-2 rounded-lg bg-white p-6 pl-4 shadow-md ">
          <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
            There is no available result for current search filters.
          </p>
        </div>
      );
    }

    return productsToDisplay.map((result, i) => (
      <Product key={"productKey_" + result.id} product={result}></Product>
    ));
  }, [isFilterSet, filterItems, products]);

  useEffect(() => {
    setFetch(false);

    const initialFetch = async () => {
      const promises = await Promise.all([
        fetch("https://fakestoreapi.com/products"),
        fetch("https://fakestoreapi.com/products/categories"),
      ]);

      const [products, categories] = await Promise.all(
        promises.map((promise) => promise.json()),
      );

      const array = ["All", ...categories];
      setProducts(products);
      setCategories(array);

      setFetch(true);
    };

    initialFetch();
  }, []);

  const onCategoryChange = async (category: string) => {
    const path =
      category === "All"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${category}`;
    const result = await fetch(path);
    const categoryProducts = await result.json();

    setFilter(false);
    setProducts(categoryProducts);
    setCategory(category);
  };

  const onMinPriceChanged = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setMinPrice(parseInt(target.value));
  };

  const onMaxPriceChanged = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setMaxPrice(parseInt(target.value));
  };

  return (
    <div className="flex grow">
      <div className="flex h-full w-1/6 flex-col bg-blue-100 px-8 pt-10">
        <p className="text-lg font-bold">Categories</p>
        <ul>
          {categories.map((category, i) => (
            <li
              key={"categoryListKey_" + i}
              className={`${
                category === currentCategory
                  ? " text-lg font-semibold text-blue-400"
                  : "text-grey-700 text-md font-normal"
              } transform transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none`}
            >
              <button
                onClick={() => onCategoryChange(category)}
                className="pl-4 capitalize "
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-lg font-bold">Price</p>
        <div className="flex items-center gap-4 pl-4 pt-2">
          <input
            onInput={(e) => onMinPriceChanged(e)}
            className="bold text-md w-1/3 rounded-lg px-4 py-1 text-center font-semibold shadow-md"
            placeholder="min"
            type="number"
          />
          <span className="text-md font-semibold">-</span>
          <input
            onInput={(e) => onMaxPriceChanged(e)}
            className="bold text-md w-1/3 rounded-lg px-4 py-1 text-center font-semibold shadow-md"
            placeholder="max"
            type="number"
          />
          <span className="text-md font-semibold">$</span>
        </div>
        <button
          onClick={onPriceFilter}
          className="bold text-md mx-12 mt-10 flex rounded-lg bg-blue-500 px-4 py-1 text-center font-semibold text-white 
          shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
        >
          FILTER
        </button>
      </div>
      <div className="flex w-5/6 flex-col items-center bg-slate-100">
        <div className="my-12 flex w-5/6 flex-col gap-8">
          <p className="margin-auto mt-2 flex w-2/4 justify-center gap-2 rounded-lg bg-white p-4 text-center text-2xl font-semibold capitalize shadow-md ">
            {currentCategory}
          </p>
          {productItems}
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product as ProductType } from "@/types";
import Product from "@/components/Product";
import { Context } from "@/components/ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import WindowContainer from "@/components/WindowContainer";

interface Prop {
  currentCategory: string;
  products: ProductType[];
  categories: any[];
  setFilter: Dispatch<SetStateAction<boolean>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  setFilteredItems: Dispatch<SetStateAction<ProductType[]>>;
}

function NavView({
  currentCategory,
  products,
  categories,
  setFilter,
  setProducts,
  setCategory,
  setFilteredItems,
}: Prop) {
  const { isMobileView, isNavEnabled, setNavView } = useContext(Context);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const onPriceFilter = useCallback(() => {
    if (minPrice == 0 && maxPrice == 0) return products;

    setFilter(true);
    const productsFiltered = products.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    setFilteredItems(productsFiltered);
  }, [maxPrice, minPrice, products, setFilter, setFilteredItems]);

  useEffect(() => {
    onPriceFilter();
  }, [products]);

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

    console.log(
      "useCallback onPriceFilter: " + minPrice + " maxPrice: " + maxPrice,
    );
  };

  const onMaxPriceChanged = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setMaxPrice(parseInt(target.value));

    console.log(
      "useCallback onPriceFilter: " + minPrice + " maxPrice: " + maxPrice,
    );
  };

  if (!isNavEnabled) return <></>;

  return (
    <div className="fixed left-0 z-[5] flex h-full w-full flex-col gap-4 bg-blue-100 px-8 pt-10 lg:relative lg:w-80">
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
      <p className="text-lg font-bold">Price</p>
      <div className="flex items-center gap-4 pl-4 pt-2">
        <input
          onInput={(e) => onMinPriceChanged(e)}
          className="bold text-md w-20  rounded-lg px-4 py-1 text-center font-semibold shadow-md"
          placeholder="min"
          type="number"
        />
        <span className="text-md font-semibold">-</span>
        <input
          onInput={(e) => onMaxPriceChanged(e)}
          className="bold text-md w-20 rounded-lg px-4 py-1 text-center font-semibold shadow-md"
          placeholder="max"
          type="number"
        />
        <span className="text-md font-semibold">$</span>
      </div>
      <button
        onClick={() => {
          onPriceFilter();
          if (isMobileView) setNavView(false);
        }}
        className="btn-primary bold text-md mx-12 mt-10 flex w-32 justify-center px-4 py-1 font-semibold "
      >
        FILTER
      </button>
    </div>
  );
}

export default function Home() {
  const { setFetch } = useContext(Context);

  const [filterItems, setFilteredItems] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentCategory, setCategory] = useState("All");
  const [isFilterSet, setFilter] = useState(false);

  const productItems = useMemo(() => {
    const productsToDisplay = isFilterSet ? filterItems : products;

    if (productsToDisplay.length == 0) {
      return (
        <WindowContainer className="flex w-2/3 gap-2 p-6 pl-4">
          <p className="m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
            There is no available result for current search.
          </p>
        </WindowContainer>
      );
    }

    return productsToDisplay.map((result, i) => (
      <Product key={"productKey_" + result.id} product={result}></Product>
    ));
  }, [isFilterSet, filterItems, products]);

  useEffect(() => {
    setFetch(false);

    console.log("innerWidth: " + window.innerWidth);

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

  return (
    <div className="flex w-full grow">
      <NavView
        currentCategory={currentCategory}
        products={products}
        categories={categories}
        setFilter={setFilter}
        setProducts={setProducts}
        setCategory={setCategory}
        setFilteredItems={setFilteredItems}
      />
      <div className="flex w-full flex-col bg-slate-100">
        <div className="my-12 flex w-full flex-col items-center justify-start gap-8">
          <WindowContainer className="mt-2 flex w-4/5 flex-col gap-2 p-4 text-2xl font-semibold capitalize lg:w-4/5 xl:flex-row xl:items-center xl:p-6 ">
            <p className="text-center xl:mr-4 xl:border-r-2 xl:border-gray-300 xl:pr-4 xl:text-left">
              {currentCategory}
            </p>
            <div className="flex items-center gap-4">
              <input
                // onInput={(e) => onMinPriceChanged(e)}
                className="bold text-md my-2 w-10/12 rounded-lg bg-blue-100 px-4 font-semibold shadow-md xl:w-3/5"
                placeholder="Search"
                type="text"
              />
              <button className="btn-primary group flex bg-blue-100 hover:bg-blue-500">
                <FontAwesomeIcon
                  className="h-4 w-4 p-2 text-gray-800 group-hover:text-white"
                  icon={faMagnifyingGlass}
                />
              </button>
            </div>
          </WindowContainer>
          {productItems}
        </div>
      </div>
    </div>
  );
}

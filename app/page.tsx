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
import {
  faMagnifyingGlass,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { SORTING_OPTIONS } from "@/consts";
import WindowContainer from "@/components/WindowContainer";

interface Prop {
  categories: any[];
  currentCategory: string;
  products: ProductType[];
  filterItems: ProductType[];
  setFilter: Dispatch<SetStateAction<boolean>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  setFilteredItems: Dispatch<SetStateAction<ProductType[]>>;
  setSearchLabelValue: Dispatch<SetStateAction<string>>;
}

function NavView({
  categories,
  currentCategory,
  products,
  filterItems,
  setFilter,
  setProducts,
  setCategory,
  setFilteredItems,
  setSearchLabelValue,
}: Prop) {
  const { isMobileView, isNavEnabled, setNavView } = useContext(Context);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const onPriceFilter = useCallback(() => {
    const productsToSort = filterItems.length === 0 ? products : filterItems;

    if (minPrice == 0 && maxPrice == 0) return productsToSort;

    setFilter(true);

    const productsFiltered = productsToSort.filter(
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
    setMinPrice(0);
    setMaxPrice(0);
    setFilteredItems([]);
    setSearchLabelValue("");
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

  const minPriceValue = useMemo(() => {
    const value = minPrice === 0 ? "" : minPrice.toString();
    return value;
  }, [minPrice]);

  const maxPriceValue = useMemo(() => {
    const value = maxPrice === 0 ? "" : maxPrice.toString();
    return value;
  }, [maxPrice]);

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
          value={minPriceValue}
        />
        <span className="text-md font-semibold">-</span>
        <input
          onInput={(e) => onMaxPriceChanged(e)}
          className="bold text-md w-20 rounded-lg px-4 py-1 text-center font-semibold shadow-md"
          placeholder="max"
          type="number"
          value={maxPriceValue}
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
  const [showSortingView, setShowSortingView] = useState(false);
  const [searchLabelValue, setSearchLabelValue] = useState<string>("");
  const [isFilterSet, setFilter] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState<number>(0);

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

  const onSearchLabelChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchLabelValue(target.value.toString());
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.code === "Enter") {
      onSearchClick();
    }
  };

  const onSearchClick = useCallback(() => {
    if (searchLabelValue === null) return products;

    const productsFiltered = products.filter((product) => {
      const title = product.title.toLowerCase();
      const contains = title.includes(searchLabelValue.toLowerCase());
      if (contains) return title;
    });

    setFilteredItems(productsFiltered);
    setFilter(true);
  }, [products, searchLabelValue]);

  useEffect(() => {
    const productsToSort = filterItems.length === 0 ? products : filterItems;
    const sortProducts =
      SORTING_OPTIONS[currentSortOption].sortResult(productsToSort);

    setFilteredItems(sortProducts);
    setFilter(true);
  }, [currentSortOption, products]);

  const sortingOption = useMemo(() => {
    return (
      <p className="p-1 text-xl">{SORTING_OPTIONS[currentSortOption].name}</p>
    );
  }, [currentSortOption]);

  const sortingView = useMemo(() => {
    const isShow = showSortingView ? "flex scale-y-100" : "hidden";
    return (
      <div
        className={`${isShow} absolute left-6 z-10 mt-12 w-full scale-x-100 rounded-lg bg-blue-100 px-2 py-4 shadow-md duration-300 ease-out `}
      >
        <ul className="flex w-full flex-col gap-2 pl-4">
          {SORTING_OPTIONS.map((sortOption, i) => (
            <button
              key={"categoryListKey_" + i}
              onClick={() => {
                setCurrentSortOption(i);
                setShowSortingView(false);
              }}
              className={`${
                i === currentSortOption
                  ? " text-left text-2xl font-semibold text-blue-400"
                  : "text-grey-700 text-xl font-normal"
              } flex transform flex-row items-center justify-between transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none`}
            >
              <p className="h-[1lh]text-left line-clamp-1 capitalize ">
                {sortOption.name}
              </p>
              {/* <FontAwesomeIcon
                className="h-4 w-4 justify-center p-2 pr-4 text-gray-800 group-hover:text-white"
                icon={sortOption.faIcon}
              /> */}
            </button>
          ))}
        </ul>
      </div>
    );
  }, [currentSortOption, showSortingView]);

  return (
    <div className="flex w-full grow">
      <NavView
        categories={categories}
        currentCategory={currentCategory}
        products={products}
        filterItems={filterItems}
        setFilter={setFilter}
        setProducts={setProducts}
        setCategory={setCategory}
        setFilteredItems={setFilteredItems}
        setSearchLabelValue={setSearchLabelValue}
      />
      <div className="flex w-full flex-col bg-slate-100">
        <div className="my-12 flex w-full flex-col items-center justify-start gap-8">
          <WindowContainer className="mt-2 flex w-4/5 flex-col gap-2 p-8 text-2xl font-semibold capitalize lg:w-4/5 xl:flex-row xl:items-center xl:p-6 ">
            <p className="whitespace-nowrap text-center xl:mr-4 xl:w-auto xl:border-r-2 xl:border-gray-300 xl:pr-4 xl:text-left">
              {currentCategory}
            </p>
            <div className="flex w-full flex-col justify-between gap-4 xl:flex-row">
              <div className="flex items-center gap-4 ">
                <input
                  onInput={(e) => onSearchLabelChange(e)}
                  className="bold text-md my-2 w-10/12 rounded-lg bg-blue-100 px-4 font-semibold shadow-md xl:w-3/5"
                  placeholder="Search"
                  type="text"
                  onKeyUp={(e) => onKeyUp(e)}
                  value={searchLabelValue}
                />
                <button
                  onClick={onSearchClick}
                  className="btn-primary group flex bg-blue-100 hover:bg-blue-500"
                >
                  <FontAwesomeIcon
                    className="h-4 w-4 p-2 text-gray-800 group-hover:text-white"
                    icon={faMagnifyingGlass}
                  />
                </button>
              </div>

              <div className="flex w-full flex-col items-center gap-2 xl:w-auto xl:flex-row xl:gap-0">
                <p className="text-center xl:mr-4 xl:w-auto xl:border-r-2 xl:border-gray-300 xl:pr-4 xl:text-left">
                  Sort
                </p>
                <div className="flex w-full items-center justify-center gap-4">
                  <div className="bold relative flex w-4/5 rounded-lg bg-blue-100 px-4 text-2xl font-semibold text-gray-600 shadow-md xl:w-64">
                    {sortingOption}
                    {sortingView}
                  </div>

                  <button
                    onClick={() => setShowSortingView(!showSortingView)}
                    className="btn-primary group flex bg-blue-100 hover:bg-blue-500"
                  >
                    <FontAwesomeIcon
                      className="h-4 w-4 p-2 text-gray-800 group-hover:text-white"
                      icon={faSortDown}
                    />
                  </button>
                </div>
              </div>
            </div>
          </WindowContainer>
          {productItems}
        </div>
      </div>
    </div>
  );
}

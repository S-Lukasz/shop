import { Product } from "@/types";
import { Context } from "@/components/ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useContext, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Prop {
  product: Product;
}

const amounts = new Array(99)
  .fill(0)
  .map((_, i) => <option key={"amountOptionKey_" + i}>{i + 1}</option>);

function AddToCart({ product }: Prop) {
  const { addItemToCart } = useContext(Context);
  const [amount, setAmount] = useState<number>(1);

  const rateStars = useMemo(() => {
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
  }, [product.rating.rate]);

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(event.target.value));
  };

  return (
    <div className="flex w-4/5 flex-col items-center justify-center rounded-lg bg-white py-8 shadow-none xl:h-full xl:w-1/3 xl:py-2 xl:shadow-md">
      <p className="bold flex text-center text-xl font-semibold  ">
        Price: {product.price} $
      </p>
      <div className="flex items-center gap-2">
        <p className=" flex text-lg font-semibold  ">{rateStars}</p>
        <Link
          href="/"
          className=" flex text-lg font-medium text-blue-400 hover:text-blue-800 hover:underline"
        >
          {"(" + product.rating.count + ")"}
        </Link>
      </div>
      <div className="mt-4 flex flex-col items-center gap-6 xl:mt-16 2xl:flex-row">
        <select
          onChange={onAmountChange}
          className="bold text-md w-20 rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md"
        >
          {amounts}
        </select>
        <button
          onClick={() => addItemToCart(amount, product)}
          className="bold text-md flex rounded-lg bg-blue-500 px-8 py-1 text-center font-semibold 
            text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-slate-200 hover:text-blue-500 motion-reduce:transform-none"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default function Product({ product }: Prop) {
  return (
    <div className="flex w-4/5 flex-col items-center justify-center rounded-lg bg-white shadow-md xl:mx-0 xl:w-full xl:flex-row xl:items-start xl:gap-8 xl:rounded-none xl:bg-transparent xl:shadow-none">
      <div className="flex w-full flex-col rounded-lg bg-white shadow-none xl:w-2/4 xl:shadow-md ">
        <Link
          href={`/products/${product.id}`}
          className=" m-4 line-clamp-1 h-[1lh] text-xl font-semibold text-gray-600 transition-all duration-100 hover:text-black"
        >
          {product.title}
        </Link>
        <div className="mb-0 flex flex-col gap-4 xl:mb-6 xl:flex-row">
          <Link
            href={`/products/${product.id}`}
            className="my-8 flex flex-shrink-0 flex-grow-0 justify-center bg-white xl:my-0 xl:ml-4 xl:h-[12rem] xl:w-[12rem]"
          >
            <Image
              className=" img_class flex rounded-lg object-contain object-center p-2 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none"
              loader={() => product.image}
              src={product.image}
              width={120}
              height={120}
              alt="proj"
            />
          </Link>
          <div className="flex flex-col">
            <p className=" z-[2] mb-2 mr-4 line-clamp-2 h-[2lh] px-8 capitalize xl:line-clamp-3 xl:h-[3lh]">
              {product.description}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="group mb-4 ml-2 mt-2 flex"
            >
              <p className="text-2xs pl-6 font-medium text-blue-400 transition-all duration-100 ease-out hover:underline group-hover:text-blue-800 ">
                Show More
              </p>
              <FontAwesomeIcon
                className="ml-2 flex h-[14px] w-[14px] pt-[5px] text-blue-400 transition-all duration-100 
                ease-out group-hover:scale-[1.2] group-hover:text-blue-800 motion-reduce:transform-none"
                icon={faChevronRight}
              />
            </Link>
          </div>
        </div>
      </div>

      <AddToCart product={product} />
    </div>
  );
}

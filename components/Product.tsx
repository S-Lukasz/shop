import { CartItem, Product } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Context } from "@/components/ContextWrapper";
import { ChangeEvent, useContext, useMemo, useState } from "react";

interface Prop {
  product: Product;
}

const amounts = new Array(99).fill(0).map((_, i) => <option>{i + 1}</option>);

export default function Product({ product }: Prop) {
  const { cartItems, setCartItems } = useContext(Context);

  const [amount, setAmount] = useState<number>(1);

  const rateStars = useMemo(() => {
    const starCount = parseInt(product.rating.rate.toString());
    const stars = new Array(5).fill(0).map((_, i) => {
      const starColor = i <= starCount ? " text-yellow-300 " : "text-gray-300";
      return <FontAwesomeIcon className={starColor} icon={faStar} />;
    });
    return stars;
  }, []);

  const addItem = () => {
    const cartItem: CartItem = { amount: amount, product };
    setCartItems([cartItem, ...cartItems]);
  };

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(event.target.value));
    console.log(event.target.value);
  };

  return (
    <div className="flex h-80  gap-8">
      <div className=" w-2/3 rounded-lg bg-slate-100 shadow-md">
        <p className=" m-4 line-clamp-1 h-[1lh] text-xl font-semibold">
          {product.title}
        </p>
        <div className="flex gap-4">
          <img
            className="my-8 ml-10 mr-8 flex h-[11rem] w-[11rem] flex-shrink-0 flex-grow-0 rounded-lg 
            bg-white object-contain object-center p-4 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none "
            src={product.image}
            alt="proj"
          />
          <div className="flex-col">
            <p className=" z-[2] mr-4 line-clamp-3 h-[3lh] capitalize ">
              {product.description}
            </p>
            <Link href="/" className="group mt-2 flex">
              <p className="text-2xs font-medium text-blue-400 transition-all duration-100 ease-out hover:underline group-hover:text-blue-800 ">
                Show More
              </p>
              <FontAwesomeIcon
                className="flext ml-2 h-[14px] w-[14px] pt-[5px] text-blue-400 transition-all duration-100 
                ease-out group-hover:scale-[1.2] group-hover:text-blue-800 motion-reduce:transform-none"
                icon={faChevronDown}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex w-1/3 flex-col items-center justify-center rounded-lg bg-slate-100 shadow-md">
        <p className="bold flex text-center text-xl font-semibold  ">
          Price: {product.price} $
        </p>
        <div className="flex items-center gap-2">
          <p className=" flex text-lg font-semibold  ">{rateStars}</p>
          <p className=" flex text-lg font-medium text-blue-400 hover:text-blue-800 hover:underline">
            {"(" + product.rating.count + ")"}
          </p>
        </div>
        <div className="mt-20 flex gap-6">
          <select
            onChange={onAmountChange}
            className="bold text-md rounded-lg px-4 py-1 font-semibold shadow-md"
          >
            {amounts}
          </select>
          <button
            onClick={addItem}
            className="bold text-md flex rounded-lg bg-blue-500 px-8 py-1 text-center font-semibold 
            text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

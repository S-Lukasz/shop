import { CartItem, Product } from "@/types";
import { ChangeEvent, useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface Prop {
  cartItem: CartItem;
  setAlertPrompt: (isAlertActive: boolean) => void;
  setAlertProduct: (product: Product) => void;
}

export default function CartProduct({
  cartItem,
  setAlertPrompt,
  setAlertProduct,
}: Prop) {
  const product = cartItem.product;
  const { addItemToCart } = useContext(Context);

  const onItemRemoveClick = () => {
    setAlertProduct(product);
    setAlertPrompt(true);
  };

  const amounts = new Array(99).fill(0).map((_, i) => (
    <option key={"cartAmountKey_" + i} selected={cartItem.amount === i + 1}>
      {i + 1}
    </option>
  ));

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const amountToAdd = parseInt(event.target.value) - cartItem.amount;
    addItemToCart(amountToAdd, product);
  };

  const getPrice = () => {
    return product.price * cartItem.amount;
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-4 shadow-md ">
      <div className="flex justify-between px-2">
        <Link
          href={`/products/${product.id}`}
          className=" ml-2 line-clamp-1 flex h-[1lh] text-ellipsis pr-2 text-xl font-semibold text-gray-600 hover:text-black xl:pr-0"
        >
          {product.title}
        </Link>
        <button
          onClick={onItemRemoveClick}
          className="flex transform text-gray-700 transition-all duration-300 ease-out 
              hover:scale-110 hover:text-black motion-reduce:transform-none"
        >
          <FontAwesomeIcon className="h-[24px] w-[24px]" icon={faTrash} />
        </button>
      </div>

      <div className="flex  xl:justify-normal">
        <Link href={`/products/${product.id}`}>
          <Image
            className="my-6 ml-2 flex h-16 flex-shrink-0 flex-grow-0 rounded-lg bg-white object-contain object-center transition-all 
                duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none xl:m-auto xl:mx-10 xl:h-24"
            loader={() => product?.image ?? ""}
            src={product?.image ?? ""}
            height={80}
            width={80}
            alt="proj"
          />
        </Link>

        <div className="m-auto flex flex-col items-center justify-center gap-3 xl:flex-row xl:gap-6">
          <p className="m-auto line-clamp-1 h-[1lh] text-xl font-semibold ">
            {product.price.toFixed(2)} $
          </p>
          <select
            onChange={onAmountChange}
            className="bold text-md m-auto rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md"
          >
            {amounts}
          </select>
          <p className="m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
            {getPrice().toFixed(2)} $
          </p>
        </div>
      </div>
    </div>
  );
}

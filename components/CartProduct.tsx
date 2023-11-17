import { CartItem, Product } from "@/types";
import { ChangeEvent, useContext } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Context } from "./ContextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface Prop {
  cartItem: CartItem;
}

export default function Product({ cartItem }: Prop) {
  const product = cartItem.product;
  const { addItemToCart, setCartItems } = useContext(Context);

  const amounts = new Array(99).fill(0).map((_, i) => (
    <option key={"cartAmountKey_" + i} selected={cartItem.amount === i + 1}>
      {i + 1}
    </option>
  ));

  const removeItem = () =>
    setCartItems((cartItems) =>
      cartItems.filter((item) => item.product.id !== cartItem.product.id),
    );

  const onAmountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const amountToAdd = parseInt(event.target.value) - cartItem.amount;
    addItemToCart(amountToAdd, product);
  };

  const getPrice = () => {
    return product.price * cartItem.amount;
  };

  return (
    <div className="flex w-full gap-2 rounded-lg bg-white shadow-md ">
      <div className="flex gap-4">
        <Image
          className="my-4 ml-10 mr-8 flex h-[5rem] w-[5rem] flex-shrink-0 flex-grow-0 rounded-lg 
            bg-white object-contain object-center p-4 transition-all duration-300 ease-out hover:scale-[1.25] motion-reduce:transform-none "
          loader={() => product?.image ?? ""}
          src={product?.image ?? ""}
          height={80}
          width={80}
          alt="proj"
        />
      </div>
      <p className=" mt-4 line-clamp-1 h-[1lh] w-80 text-xl font-semibold">
        {product.title}
      </p>
      <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
        {product.price.toFixed(2)} $
      </p>
      <select
        onChange={onAmountChange}
        className=" bold text-md m-auto rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md"
      >
        {amounts}
      </select>
      <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
        {getPrice().toFixed(2)} $
      </p>
      <button
        onClick={removeItem}
        className="m-auto flex transform pr-2 text-gray-700 transition-all duration-300 ease-out hover:scale-110 hover:text-black motion-reduce:transform-none"
      >
        <FontAwesomeIcon className="h-[24px] w-[24px]" icon={faTrash} />
      </button>
    </div>
  );
}

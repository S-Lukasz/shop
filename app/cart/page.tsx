"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "@/components/ContextWrapper";
import CartProduct from "@/components/CartProduct";
import AlertPrompt from "@/components/AlertPrompt";
import { Product } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface OrderStage {
  id: number;
  name: string;
}

const ORDER_STAGE: OrderStage[] = [
  {
    id: 1,
    name: "Cart",
  },
  {
    id: 2,
    name: "Delivery",
  },
  {
    id: 3,
    name: "Payment",
  },
];

export default function About() {
  const [currentStage, setCurrentStage] = useState(0);
  const { cartItems, setCartItems } = useContext(Context);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [product, setAlertProduct] = useState<Product>();
  const alertText =
    "Are you sure you want to delete productName item from cart?";

  useEffect(() => {
    console.log("currentStage: " + currentStage);
  }, [currentStage]);

  const productItems = useMemo(() => {
    if (cartItems.length > 0) {
      return cartItems.map((item) => (
        <CartProduct
          key={"productKey_" + item.product.id}
          setAlertPrompt={setIsAlertActive}
          setAlertProduct={setAlertProduct}
          cartItem={item}
        ></CartProduct>
      ));
    } else {
      return (
        <div className="flex w-full gap-2 rounded-lg bg-white p-6 pl-4 shadow-md ">
          <p className=" m-auto line-clamp-1 h-[1lh] text-xl font-semibold">
            No items in cart
          </p>
        </div>
      );
    }
  }, [cartItems]);

  const stageName = useMemo(() => {
    if (currentStage + 1 <= ORDER_STAGE.length - 1)
      return ORDER_STAGE[currentStage + 1].name;

    return "Submit";
  }, [currentStage]);

  const totalPrice = useMemo(() => {
    let result = 0;
    for (const cartItem of cartItems) {
      result += cartItem.amount * cartItem.product.price;
    }
    return result;
  }, [cartItems]);

  const removeItem = (product?: Product) => {
    if (!product) return;

    setCartItems((cartItems) =>
      cartItems.filter((item) => item.product.id !== product.id),
    );

    setIsAlertActive(false);
  };

  const onNextCartStage = () => {
    if (currentStage === ORDER_STAGE.length - 1) return;

    setCurrentStage(currentStage + 1);
  };

  const onPrevCartStage = () => {
    if (currentStage === 0) return;

    setCurrentStage(currentStage - 1);
  };

  const stageView = useMemo(() => {
    if (currentStage === 0) {
      return (
        <>
          <div className=" flex w-1/2 flex-col gap-8 ">{productItems}</div>

          <AlertPrompt
            title={alertText.replace(
              "productName",
              `<span style="color: blue>${product?.title ?? ""}</span>`,
            )}
            arg0="Yes"
            arg1="No"
            show={isAlertActive}
            onClose={() => setIsAlertActive(false)}
            onConfirm={() => removeItem(product)}
          />
        </>
      );
    } else if (currentStage === 1) {
      return (
        <div className="flex w-1/2 justify-center rounded-lg bg-white py-6 text-center font-semibold shadow-md">
          DELIVERY
        </div>
      );
    }

    return (
      <div className="flex w-1/2 justify-center rounded-lg bg-white py-6 text-center font-semibold shadow-md">
        PAYMENT
      </div>
    );
  }, [currentStage]);

  return (
    <div className=" flex h-full w-full flex-col items-center gap-12">
      <div className="mt-20 flex h-min w-1/2 rounded-lg bg-white p-6 text-center shadow-md">
        {ORDER_STAGE.map((result, i) => {
          const stageIdColor =
            i == currentStage
              ? "bg-blue-500 text-white border-blue-100"
              : "bg-white text-black border-gray-700";
          const borderRight =
            i == ORDER_STAGE.length - 1 ? "" : "border-r-2 border-gray-400";
          return (
            <div
              key={"orderStageKey_" + i}
              className="ml-8 flex items-center justify-center gap-8 "
            >
              <div
                className={`${stageIdColor} text-md flex h-[28px] w-[28px] items-center justify-center rounded-full 
                border-[3px] text-center font-bold shadow-md`}
              >
                {result.id}
              </div>
              <p
                className={`${borderRight} line-clamp-1 flex h-[1lh] pr-8 text-xl font-semibold`}
              >
                {result.name}
              </p>
            </div>
          );
        })}
      </div>
      {stageView}
      <div className="flex w-1/2 justify-end gap-16 rounded-lg bg-white p-6 pl-4 pr-28 shadow-md">
        <button
          onClick={onPrevCartStage}
          className="bold text-md group m-auto flex items-center justify-center gap-2 rounded-lg
              bg-blue-500 px-8 py-1 text-center font-semibold  shadow-md transition-all 
              duration-300 ease-out hover:scale-[1.1] hover:bg-white motion-reduce:transform-none"
        >
          <FontAwesomeIcon
            className="h-[14px] w-[14px] text-white group-hover:text-blue-500"
            icon={faChevronLeft}
          />
          <p className="pr-2 text-white group-hover:text-blue-500">Back</p>
        </button>

        <button
          onClick={onNextCartStage}
          className="bold text-md m-auto flex rounded-lg bg-blue-500 px-8 py-1
                text-center font-semibold text-white shadow-md transition-all duration-300 ease-out hover:scale-[1.1] 
                hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
        >
          {stageName}
        </button>
        <p className=" pr- line-clamp-1 h-[1lh] text-xl font-semibold">
          Total price:
        </p>
        <p className=" pr- line-clamp-1 h-[1lh] text-xl font-semibold">
          {totalPrice.toFixed(2)} $
        </p>
      </div>
    </div>
  );
}

// const STAGE_VIEW: StageView[] = [
//   {
//     id: 1,
//     void: CartStageView(),
//   },
//   {
//     id: 2,
//     void: CartStageView(),
//   },
//   {
//     id: 3,
//     void: CartStageView(),
//   },
// ];

// return <>{STAGE_VIEW[currentStage].void}</>;

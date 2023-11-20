"use client";

import {
  FormEvent,
  HTMLInputTypeAttribute,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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

interface DeliveryData {
  data: string;
  type: HTMLInputTypeAttribute;
}

const DELIVERY_DATA: DeliveryData[] = [
  {
    data: "First Name",
    type: "text",
  },
  {
    data: "Last Name",
    type: "text",
  },
  {
    data: "E-mail",
    type: "email",
  },
  {
    data: "Address",
    type: "text",
  },
];

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

export default function Cart() {
  const [currentStage, setCurrentStage] = useState(0);
  const { cartItems, setCartItems } = useContext(Context);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [product, setAlertProduct] = useState<Product>();
  const [deliveryInputs, setDeliveryInput] = useState(
    DELIVERY_DATA.map(() => ""),
  );

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
        <div className="flex w-full gap-2 rounded-lg bg-white px-6 py-10 pl-4 shadow-md ">
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
    console.log("removeItem: " + product?.title);

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

  const onInputChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;

    setDeliveryInput((inputs) =>
      inputs.map((result, i) => {
        if (i === index) return target.value;
        return result;
      }),
    );
  };

  const stageView = useMemo(() => {
    if (currentStage === 0) {
      return (
        <div className=" flex w-4/5 flex-col gap-8 xl:w-2/5 ">
          {productItems}
        </div>
      );
    } else if (currentStage === 1) {
      const deliveryResult = DELIVERY_DATA.map((result, i) => {
        return (
          <input
            onInput={(e) => onInputChange(e, i)}
            key={"deliveryResultKey_" + i}
            className="bold text-md w-4/5 rounded-lg bg-blue-100 px-4 py-1 font-semibold shadow-md xl:w-1/3"
            placeholder={result.data}
            type={result.type}
          />
        );
      });

      return (
        <div className="flex w-4/5 flex-col items-center justify-center gap-4 rounded-lg bg-white pb-8 pt-6 text-center font-semibold shadow-md xl:w-1/2">
          <p>Delivery Information</p>
          {deliveryResult}
        </div>
      );
    } else if (currentStage === 2) {
      const clearInputs = DELIVERY_DATA.map(() => "");
      setDeliveryInput(clearInputs);
      return (
        <div className="flex w-4/5 justify-center rounded-lg bg-white py-6 text-center font-semibold shadow-md xl:w-1/2">
          PAYMENT
        </div>
      );
    }
  }, [currentStage, productItems]);

  const stageButton = useMemo(() => {
    let inputsFilled = 0;
    for (let index = 0; index < deliveryInputs.length; index++) {
      if (deliveryInputs[index]) inputsFilled++;
    }

    let isDisabled = false;

    if (currentStage == 0) isDisabled = cartItems.length === 0;
    else if (currentStage == 1)
      isDisabled = inputsFilled !== deliveryInputs.length;

    const disabledStyle = isDisabled
      ? "bg-blue-300 text-gray-200"
      : "bg-blue-500 text-white transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none";

    return (
      <button
        onClick={onNextCartStage}
        disabled={isDisabled}
        className={`${disabledStyle} xl:order-0 bold text-md order-[-1] m-auto flex justify-center rounded-lg px-8 py-1 text-center
        font-semibold shadow-md xl:w-1/5`}
      >
        {stageName}
      </button>
    );
  }, [
    cartItems.length,
    currentStage,
    deliveryInputs,
    onNextCartStage,
    stageName,
  ]);

  const backButton = useMemo(() => {
    if (currentStage == 0) return <></>;

    return (
      <button
        onClick={onPrevCartStage}
        className="bold text-md group order-[-2] m-auto flex items-center justify-center gap-2 rounded-lg
        bg-blue-500 px-8 py-1 text-center font-semibold shadow-md transition-all 
        duration-300 ease-out hover:scale-[1.1] hover:bg-white motion-reduce:transform-none"
      >
        <FontAwesomeIcon
          className="h-[14px] w-[14px] text-white group-hover:text-blue-500"
          icon={faChevronLeft}
        />
        <p className="pr-2 text-white group-hover:text-blue-500">Back</p>
      </button>
    );
  }, [currentStage, onPrevCartStage]);

  const alertTitleText = useMemo(() => {
    return (
      <p className="mx-4 flex flex-col xl:mx-14">
        <p>Are you sure you want to delete:</p>
        <span className="text-blue-800">
          &apos; {product?.title ?? ""}&apos;{" "}
        </span>
        <p>item from cart?</p>
      </p>
    );
  }, [product]);

  return (
    <div className="mb-16 flex h-full w-full flex-col items-center gap-12">
      <div className="mt-20 flex h-min w-2/3 divide-x-2 divide-gray-400 rounded-lg bg-white p-6 text-center shadow-md xl:w-1/2">
        {ORDER_STAGE.map((result, i) => {
          const stageIdColor =
            i == currentStage
              ? "bg-blue-500 text-white border-blue-100"
              : "bg-white text-black border-gray-700";
          return (
            <div
              key={"orderStageKey_" + i}
              className="flex grow items-center justify-center gap-6"
            >
              <div
                className={`${stageIdColor} text-md flex h-[28px] w-[28px] items-center justify-center rounded-full 
                border-[3px] text-center font-bold shadow-md`}
              >
                {result.id}
              </div>
              <p className="line-clamp-1 hidden h-[1lh] text-xl font-semibold xl:flex ">
                {result.name}
              </p>
            </div>
          );
        })}
      </div>
      {stageView}
      <div className=" flex w-4/5 flex-col items-center gap-4 rounded-lg bg-white p-4 shadow-md xl:w-1/2 xl:flex-row xl:justify-end xl:gap-16 xl:p-6 xl:pl-4 xl:pr-28">
        {backButton}
        {stageButton}
        <div className="flex flex-row xl:flex-col">
          <p className="line-clamp-1 h-[1lh] pr-2 text-xl font-semibold">
            Total price:
          </p>
          <p className="line-clamp-1 h-[1lh] text-xl font-semibold">
            {totalPrice.toFixed(2)} $
          </p>
        </div>
      </div>

      <AlertPrompt
        title={alertTitleText}
        arg0="Yes"
        arg1="No"
        show={isAlertActive}
        onClose={() => setIsAlertActive(false)}
        onConfirm={() => removeItem(product)}
      />
    </div>
  );
}

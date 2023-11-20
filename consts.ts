import { HTMLInputTypeAttribute } from "react";

interface OrderStage {
  id: number;
  name: string;
}

interface DeliveryData {
  data: string;
  type: HTMLInputTypeAttribute;
}

export const DELIVERY_DATA: DeliveryData[] = [
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

export const ORDER_STAGE: OrderStage[] = [
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

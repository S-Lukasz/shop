import {
  IconDefinition,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { Product as ProductType } from "@/types";
import { HTMLInputTypeAttribute } from "react";

interface OrderStage {
  id: number;
  name: string;
}

interface DeliveryData {
  data: string;
  type: HTMLInputTypeAttribute;
}

interface SortingOption {
  name: string;
  faIcon: IconDefinition;
  sortResult: (products: ProductType[]) => ProductType[]; // : ProductType[];
}

export const SORTING_OPTIONS: SortingOption[] = [
  {
    name: "Price To High",
    faIcon: faSortUp,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort((productA, productB) => productA.price - productB.price),
  },
  {
    name: "Price To Low",
    faIcon: faSortDown,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort((productA, productB) => productB.price - productA.price),
  },
  {
    name: "Rating To High",
    faIcon: faSortDown,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort(
          (productA, productB) => productA.rating.rate - productB.rating.rate,
        ),
  },
  {
    name: "Rating To Low",
    faIcon: faSortDown,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort(
          (productA, productB) => productB.rating.rate - productA.rating.rate,
        ),
  },
  {
    name: "Name A-Z",
    faIcon: faSortUp,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort((productA, productB) =>
          productB.title > productA.title ? -1 : 1,
        ),
  },
  {
    name: "Most Popular",
    faIcon: faSortDown,
    sortResult: (products: ProductType[]) =>
      products
        .slice()
        .sort(
          (productA, productB) => productB.rating.count - productA.rating.count,
        ),
  },
];

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

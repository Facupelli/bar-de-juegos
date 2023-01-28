import { SetStateAction } from "react";
import { Promotion, PromotionOnUser, SortedPromotion } from "../types/model";
import { fetchPromotionsRanking } from "./fetching";

type Promo = {
  id: string;
  name: string;
  users: {
    id: string;
    userId: string;
    quantity: number;
    createdAt: Date;
  }[];
  points: number;
};

export const getPromotionsReducedQuantity = (promotions: Promo[]) => {
  return promotions.map((promotion) => ({
    ...promotion,
    total: promotion.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));
};

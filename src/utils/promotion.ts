import { SetStateAction } from "react";
import { Promotion, SortedPromotion } from "../types/model";
import { fetchPromotionsRanking } from "./fetching";

export const getPromotionsReducedQuantity = (promotions: Promotion[]) => {
  return promotions.map((promotion) => ({
    ...promotion,
    total: promotion.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));
};

export const updatePromtoionsState = async (
  setPromotions: React.Dispatch<SetStateAction<SortedPromotion[]>>
) => {
  const promotions = await fetchPromotionsRanking();

  const promotionsReducedQuantity = getPromotionsReducedQuantity(promotions);

  const sortedPromotions = promotionsReducedQuantity.sort((a, b) =>
    a.total > b.total ? -1 : 1
  );

  setPromotions(sortedPromotions);
};

import { ConsumptionType } from "../types/model";

type Drink = {
  id: string;
  type: ConsumptionType;
  points: number;
  users: {
    id: string;
    userId: string;
    consumptionId: string;
    winner: boolean | null;
    quantity: number;
    createdAt: Date;
  }[];
};

export const getConsumptionsReducedQuantity = (consumptions: Drink[]) => {
  return consumptions.map((consumption) => ({
    ...consumption,
    total: consumption.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));
};

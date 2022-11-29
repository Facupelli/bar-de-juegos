export type User = {
  id: string;
  role: string;
  fullName: string;
  membership: Membership;
  consumptions: ConsumptionOnUser[];
  promotions: PromotionOnUser[];
  totalPoints: number;
  totalPointsSpent: number;
  createdAt: Date;
  updatedAt: Date;
};

export const ConsumptionType: {
  DRINK: "DRINK";
  GAME: "GAME";
} = {
  DRINK: "DRINK",
  GAME: "GAME",
};

export type Consumption = {
  id: string;
  name: string;
  type: typeof ConsumptionType;
  points: number;
  users: ConsumptionOnUser[];
  promotions: ConsumptionOnPromotion[];
};

export type SortedConsumption = {
  id: string;
  name: string;
  type: typeof ConsumptionType;
  points: number;
  users: ConsumptionOnUser[];
  promotions: Promotion[];
  total: string;
};

export type ConsumptionOnUser = {
  id: string;
  user: User;
  userId: string;
  consumption: Consumption;
  consumptionId: string;
  quantity: number;
  createdAt: Date;
};

export type Membership = {
  id: string;
  name: string;
  users: User[];
  promotions: Promotion[];
};

export type Promotion = {
  id: string;
  name: string;
  memberships: Membership[];
  consumptions: ConsumptionOnPromotion[];
  users: PromotionOnUser[];
  points: number;
};

export type SortedPromotion = {
  id: string;
  name: string;
  memberships: Membership[];
  consumptions: ConsumptionOnPromotion[];
  users: PromotionOnUser[];
  points: number;
  total: string;
};

export type ConsumptionOnPromotion = {
  consumption: Consumption;
  consumptionId: string;
  promotion: Promotion;
  promotionId: string;
  quantity: number;
  createdAt: Date;
};

export type PromotionOnUser = {
  id: string;
  promotion: Promotion;
  promotionId: string;
  user: User;
  userId: string;
  quantity: number;
  createdAt: Date;
};

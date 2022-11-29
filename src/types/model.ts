export type User = {
  id: string;
  role: string;
  fullName: string;
  membership: Membership;
  consumptions: ConsumptionOnUser[];
  promotions: Promotion[];
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
  promotions: Promotion[];
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
  consumptions: Consumption[];
  users: User[];
};

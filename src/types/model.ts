export type User = {
  id: string;
  role: string;
  fullName: string;
  membership: Membership;
  games: Game[];
  drinks: Drink[];
  totalPoints: number;
  totalPointsSpent: number;
  createdAt: Date;
  updatedAt: Date;
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
  memebership: Membership;
  drinks: Drink[];
  games: Game[];
};

export type Drink = {
  id: string;
  name: string;
  points: number;
  users: User[];
  promotions: Promotion[];
};

export type Game = {
  id: string;
  name: string;
  points: number;
  users: User[];
  promotions: Promotion[];
};

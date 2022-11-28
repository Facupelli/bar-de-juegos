export type User = {
  id: string;
  role: string;
  fullName: string;
  membership: Membership;
  games: IncludeGame[];
  drinks: IncludeDrink[];
  promotions: Promotion[];
  totalPoints: number;
  totalPointsSpent: number;
  createdAt: Date;
  updatedAt: Date;
};

type IncludeDrink = {
  drink: Drink;
  drinkId: string;
  quantity: number;
  userId: string;
};

type IncludeGame = {
  game: Game;
  gameId: string;
  quantity: number;
  userId: string;
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
  drinks: Drink[];
  games: Game[];
  users: User[];
};

export type Drink = {
  id: string;
  name: string;
  points: number;
  users: DrinksOnUser[];
  promotions: Promotion[];
};

export type Game = {
  id: string;
  name: string;
  points: number;
  users: GamesOnUser[];
  promotions: Promotion[];
};

export type DrinksOnUser = {
  user: User;
  userId: string;
  drink: Drink;
  drinkId: string;
  quantity: number;
};

export type GamesOnUser = {
  user: User;
  userId: string;
  game: Game;
  gameId: string;
  quantity: number;
};

export type SortedDrinks = {
  id: string;
  name: string;
  points: number;
  users: DrinksOnUser[];
  total: number;
};

export type SortedGames = {
  id: string;
  name: string;
  points: number;
  users: GamesOnUser[];
  total: number;
};

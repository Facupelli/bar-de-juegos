import { SetStateAction } from "react";
import { Consumption, SortedConsumption } from "../types/model";
import { fetchConsumptions } from "./fetching";

export const getConsumptionsReducedQuantity = (consumptions: Consumption[]) => {
  return consumptions.map((consumption) => ({
    ...consumption,
    total: consumption.users.reduce((acc, curr) => {
      return acc + curr.quantity;
    }, 0),
  }));
};

export const updateDrinksState = async (
  setDrinks: React.Dispatch<SetStateAction<SortedConsumption[]>>
) => {
  const consumptions = await fetchConsumptions();

  const drinksReducedQuantity = getConsumptionsReducedQuantity(
    consumptions.drinks
  );

  const sortedDrinks = drinksReducedQuantity.sort(
    (a: SortedConsumption, b: SortedConsumption) => (a.total > b.total ? -1 : 1)
  );

  setDrinks(sortedDrinks);
};

export const updateGamesState = async (
  setGames: React.Dispatch<SetStateAction<SortedConsumption[]>>
) => {
  const consumptions = await fetchConsumptions();

  const gamesReducedQuantity = getConsumptionsReducedQuantity(
    consumptions.games
  );

  const sortedGames = gamesReducedQuantity.sort(
    (a: SortedConsumption, b: SortedConsumption) => (a.total > b.total ? -1 : 1)
  );

  setGames(sortedGames);
};

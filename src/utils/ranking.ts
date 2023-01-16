import { SetStateAction } from "react";
import { UsersRanking } from "../types/ranking";
import { GameOver } from "../types/socketio";
import { fetchGameRanking } from "./fetching";

export const updateGameRankingState = async (
  setGamesRanking: React.Dispatch<SetStateAction<UsersRanking[]>>,
  data: GameOver
) => {
  const ranking = await fetchGameRanking(data.id);

  setGamesRanking(ranking);
};

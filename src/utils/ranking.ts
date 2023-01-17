import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { UsersRanking } from "../types/ranking";

export const getGameRanking = async (
  id: string,
  setUsersRanking: Dispatch<SetStateAction<UsersRanking[] | undefined>>
) => {
  const gameRanking = await axios(
    `http://localhost:3000/api/ranking?gameId=${id}`
  );

  setUsersRanking(gameRanking.data);
};

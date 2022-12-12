import { SetStateAction } from "react";
import { User } from "../types/model";
import { fetchUserById } from "./fetching";

export const updateUserState = async (
  userId: string,
  setUser: React.Dispatch<SetStateAction<User>>
) => {
  const user = await fetchUserById(userId);

  setUser(user);
};

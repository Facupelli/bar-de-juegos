import axios from "axios";
import {
  Consumption,
  ConsumptionCategory,
  Membership,
  Promotion,
  User,
} from "../types/model";
import { UsersRanking } from "../types/ranking";

export const fetchConsumptions = async () => {
  const { data }: { data: ConsumptionCategory[] } = await axios(
    "http://localhost:3000/api/consumption"
  );
  return data;
};

export const fetchMemberships = async () => {
  const { data }: { data: Membership[] } = await axios(
    "http://localhost:3000/api/membership"
  );
  return data;
};

export const fetchPromotions = async () => {
  const { data }: { data: Promotion[] } = await axios(
    "http://localhost:3000/api/promotion"
  );
  return data;
};

export const fetchPromotionsRanking = async () => {
  const { data }: { data: Promotion[] } = await axios(
    "http://localhost:3000/api/promotion?ranking=true"
  );
  return data;
};

export const fetchUsersByExchange = async () => {
  const { data }: { data: User[] } = await axios(
    "http://localhost:3000/api/user?userRanking=true"
  );
  return data;
};

export const fetchUserById = async (id: string) => {
  const { data }: { data: User } = await axios(
    `http://localhost:3000/api/user/${id}`
  );
  return data;
};

export const fetchUsers = async (skip: number) => {
  const { data }: { data: User[] } = await axios(
    `http://localhost:3000/api/user?skip=${skip}`
  );
  return data;
};

export const fetchGameRanking = async (id: string) => {
  const { data }: { data: UsersRanking[] } = await axios(
    `http://localhost:3000/api/ranking?gameId=${id}`
  );
  return data;
};

import axios from "axios";
import { Consumption, Membership, Promotion, User } from "../types/model";

export const fetchConsumptions = async () => {
  const {
    data,
  }: {
    data: {
      drinks: Consumption[];
      games: Consumption[];
      foods: Consumption[];
    };
  } = await axios("http://localhost:3000/api/consumption");
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

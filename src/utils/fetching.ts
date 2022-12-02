import axios from "axios";
import { Consumption, Membership, Promotion } from "../types/model";

export const fetchConsumptions = async () => {
  const {
    data,
  }: {
    data: {
      drinks: Consumption[];
      games: Consumption[];
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

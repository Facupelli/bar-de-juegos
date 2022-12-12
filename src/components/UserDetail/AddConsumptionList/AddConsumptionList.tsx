import { SetStateAction } from "react";

import AddConsumption from "./AddCosumption/AddConsumption";

import { Consumption, User } from "../../../types/model";

import s from "./AddConsumptionList.module.scss";

type Props = {
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
  userId: string;
  setUser: React.Dispatch<SetStateAction<User>>;
};

export default function AddConsumptionList({
  consumptions,
  userId,
  setUser,
}: Props) {
  return (
    <article className={s.article}>
      <AddConsumption
        consumptions={consumptions.drinks}
        name="Bebida"
        userId={userId}
        setUser={setUser}
      />
      <AddConsumption
        consumptions={consumptions.games}
        name="Juego"
        userId={userId}
        setUser={setUser}
      />
      <AddConsumption
        consumptions={consumptions.foods}
        name="Comida"
        userId={userId}
        setUser={setUser}
      />
    </article>
  );
}

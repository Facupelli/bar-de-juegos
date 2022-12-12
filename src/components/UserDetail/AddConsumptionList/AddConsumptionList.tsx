import { Consumption } from "../../../types/model";

import AddConsumption from "./AddCosumption/AddConsumption";

import s from "./AddConsumptionList.module.scss";

type Props = {
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
    foods: Consumption[];
  };
  userId: string;
};

export default function AddConsumptionList({ consumptions, userId }: Props) {
  return (
    <article className={s.article}>
      <AddConsumption
        consumptions={consumptions.drinks}
        name="Bebida"
        userId={userId}
      />
      <AddConsumption
        consumptions={consumptions.games}
        name="Juego"
        userId={userId}
      />
      <AddConsumption
        consumptions={consumptions.foods}
        name="Comida"
        userId={userId}
      />
    </article>
  );
}

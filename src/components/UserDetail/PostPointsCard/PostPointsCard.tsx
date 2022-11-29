import { Consumption } from "../../../types/model";
import AddConsumption from "../AddCosumption/AddConsumption";

import s from "./PostPointsCard.module.scss";

type Props = {
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
  };
  userId: string;
};

export default function PostPointsCard({ consumptions, userId }: Props) {
  return (
    <article>
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
    </article>
  );
}

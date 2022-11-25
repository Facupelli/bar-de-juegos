import { useForm } from "react-hook-form";
import { Drink, Game } from "../../types/model";
import AddConsumption from "../UserDetail/AddCosumption/AddConsumption";

import s from "./PostPointsCard.module.scss";

type Props = {
  drinks: Drink[];
  games: Game[];
  userId: string;
};

export default function PostPointsCard({ drinks, games, userId }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm();

  return (
    <article>
      <AddConsumption consumptions={drinks} name="Bebida" userId={userId} />
      <AddConsumption consumptions={games} name="Juego" userId={userId} />
    </article>
  );
}

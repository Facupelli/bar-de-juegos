import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Consumption, Membership } from "../../../types/model";

import s from "./CreatePromotion.module.scss";

type Props = {
  memberships: Membership[];
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
  };
};

export default function CreatePromotion({ memberships, consumptions }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionData>();

  type PromotionData = {
    name: string;
    membershipsIds: string[];
    gamesIds: string[];
    drinksIds: string[];
  };

  const onSubmitPromotion: SubmitHandler<PromotionData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/promotion",
      data
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitPromotion)} className={s.form}>
      <h4>CREAR PROMOCION</h4>

      <label>Nombre:</label>
      <input type="text" {...register("name")} />

      <label>Membresias:</label>
      <select multiple {...register("membershipsIds")}>
        {memberships?.map((membership) => (
          <option key={membership.id} value={membership.id}>
            {membership.name}
          </option>
        ))}
      </select>

      <label>Juegos:</label>
      <select multiple {...register("gamesIds")}>
        {consumptions.games?.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      <label>Bebidas:</label>
      <select multiple {...register("drinksIds")}>
        {consumptions.drinks?.map((drink) => (
          <option key={drink.id} value={drink.id}>
            {drink.name}
          </option>
        ))}
      </select>

      <button type="submit">CREAR</button>
    </form>
  );
}

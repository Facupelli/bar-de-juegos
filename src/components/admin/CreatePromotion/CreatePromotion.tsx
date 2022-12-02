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
    points: number;
  };

  const onSubmitPromotion: SubmitHandler<PromotionData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/promotion",
      {
        name: data.name,
        membershipsIds: data.membershipsIds,
        consumptionsIds: [...data.drinksIds, ...data.gamesIds],
        points: data.points,
      }
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitPromotion)}
      className={`${s.flex_column} ${s.gap}`}
    >
      <h4>CREAR PROMOCION</h4>

      <div className={s.flex_column}>
        <label>Nombre:</label>
        <input type="text" {...register("name")} />
      </div>

      <div className={s.flex_column}>
        <label>Membresias:</label>
        <select multiple {...register("membershipsIds")}>
          {memberships?.map((membership) => (
            <option key={membership.id} value={membership.id}>
              {membership.name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Juegos:</label>
        <select multiple {...register("gamesIds")}>
          {consumptions.games?.map((game) => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Bebidas:</label>
        <select multiple {...register("drinksIds")}>
          {consumptions.drinks?.map((drink) => (
            <option key={drink.id} value={drink.id}>
              {drink.name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Puntos:</label>
        <input type="text" {...register("points")} />
      </div>

      <button type="submit">CREAR</button>
    </form>
  );
}

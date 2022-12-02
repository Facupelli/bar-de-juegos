import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { Consumption, Membership, Promotion } from "../../../types/model";

import s from "./CreatePromotion.module.scss";

type Props = {
  memberships: Membership[];
  consumptions: {
    drinks: Consumption[];
    games: Consumption[];
  };
  setPromotionsList: React.Dispatch<React.SetStateAction<Promotion[]>>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type PromotionData = {
  name: string;
  membershipsIds: string[];
  gamesIds: string[];
  drinksIds: string[];
  points: number;
};

export default function CreatePromotion({
  memberships,
  consumptions,
  setPromotionsList,
  setOpenCreateModal,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromotionData>();

  const fetchPromotions = async () => {
    const { data }: { data: Promotion[] } = await axios(
      "http://localhost:3000/api/promotion"
    );
    return data;
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
      setPromotionsList(await fetchPromotions());
      setOpenCreateModal(false);
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

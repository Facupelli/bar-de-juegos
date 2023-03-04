import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchPromotions } from "../../../utils/fetching";

import Button from "../../UI/Button/Button";

import {
  Consumption,
  ConsumptionCategory,
  Membership,
  Promotion,
} from "../../../types/model";

import s from "./CreatePromotion.module.scss";

type Props = {
  memberships: Membership[];
  consumptions: ConsumptionCategory[];
  setPromotionsList: React.Dispatch<React.SetStateAction<Promotion[]>>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type PromotionData = {
  name: string;
  membershipsIds: string[];
  gamesIds: string[];
  drinksIds: string[];
  foodIds: string[];
  points: number;
  discount: number;
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
    reset,
    formState: { errors },
  } = useForm<PromotionData>();

  const onSubmitPromotion: SubmitHandler<PromotionData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/promotion",
      {
        name: data.name,
        membershipsIds: data.membershipsIds,
        consumptionsIds: [...data.drinksIds, ...data.gamesIds],
        points: data.points,
        discount: data.discount,
      }
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
      setPromotionsList(await fetchPromotions());
      setOpenCreateModal(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitPromotion)}
      className={`${s.flex_column} ${s.gap}`}
    >
      <h4>CREAR PROMOCIÓN</h4>

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

      {/* 
      <div className={s.flex_column}>
        {Object.entries(consumptionsByCategory).map((category) => (
          <>
            <label>{category[0]}:</label>
            <select key={category[0]} multiple {...register(`${category[0].toLowerCase()}Ids`)}>
              {category[1].map((consumption) => (
                <option>{consumption.name}</option>
              ))}
            </select>
          </>
        ))}
      </div> */}

      <div className={s.flex_column}>
        <label>Comida:</label>
        <select multiple {...register("foodIds")}>
          {consumptions
            .find((c) => c.name === "Comida")
            ?.consumptions?.map((food) => (
              <option key={food.id} value={food.id}>
                {food.name}
              </option>
            ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Bebida:</label>
        <select multiple {...register("drinksIds")}>
          {consumptions
            .find((c) => c.name === "Bebida")
            ?.consumptions?.map((drink) => (
              <option key={drink.id} value={drink.id}>
                {drink.name}
              </option>
            ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Juegos:</label>
        <select multiple {...register("gamesIds")}>
          {consumptions
            .find((c) => c.name === "Juego")
            ?.consumptions?.map((game) => (
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Descuento (%):</label>
        <input type="text" {...register("discount")} />
      </div>

      <div className={s.flex_column}>
        <label>Puntos:</label>
        <input type="text" {...register("points")} />
      </div>

      <Button type="primary" operation="submit">
        CREAR
      </Button>
    </form>
  );
}

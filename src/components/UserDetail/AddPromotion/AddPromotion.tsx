import axios from "axios";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Promotion } from "../../../types/model";
import s from "./AddPromotion.module.scss";

type Props = {
  promotions: Promotion[];
  userId: string;
  userPoints: number;
};

type FormData = {
  promotion: string;
};

export default function AddPromotion({
  promotions,
  userPoints,
  userId,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const promotionSelected = watch("promotion");
  const promotionSelectedPoints: number = Number(
    promotionSelected?.split("-")[1]
  );

  const onSubmitPromotion: SubmitHandler<FormData> = async (data) => {
    const promotionId = data.promotion.split("-")[0];
    const promotionPoints = data.promotion.split("-")[1];

    const postConsumption = await axios.put(
      `http://localhost:3000/api/user/${userId}`,
      {
        userId,
        promotionId,
        points: promotionPoints,
        quantity: 1,
      }
    );

    if (postConsumption.data.message === "success") {
      console.log("success");
    }
  };

  return (
    <article className={s.container}>
      <p>Promociones Validas:</p>
      <form className={s.flex} onSubmit={handleSubmit(onSubmitPromotion)}>
        <select {...register("promotion")}>
          <option>seleccionar</option>
          {promotions.map((promotion) => (
            <option
              key={promotion.id}
              value={`${promotion.id}-${promotion.points}`}
            >
              {promotion.name}
            </option>
          ))}
        </select>
        <button disabled={!(userPoints - promotionSelectedPoints >= 0)}>
          CARGAR
        </button>
      </form>
    </article>
  );
}

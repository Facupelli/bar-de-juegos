import axios from "axios";
import { SetStateAction, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../UI/Button/Button";

import { updateUserState } from "../../../utils/userID";

import { Promotion, User } from "../../../types/model";

import s from "./AddPromotion.module.scss";

type Props = {
  promotions: Promotion[];
  userId: string;
  userPoints: number;
  setUser: React.Dispatch<SetStateAction<User>>;
};

type FormData = {
  promotion: string;
};

export default function AddPromotion({
  promotions,
  userPoints,
  userId,
  setUser,
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

    await axios.post(`http://localhost:3000/api/socket/exchangePromotion`);

    if (postConsumption.data.message === "success") {
      console.log("success");
      updateUserState(userId, setUser);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmitPromotion)}>
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
      <Button
        type="primary"
        operation="submit"
        disabled={!(userPoints - promotionSelectedPoints >= 0)}
      >
        CARGAR
      </Button>
    </form>
  );
}

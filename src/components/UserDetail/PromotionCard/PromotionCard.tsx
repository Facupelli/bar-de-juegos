import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Promotion, User } from "../../../types/model";
import { updateUserState } from "../../../utils/userID";
import s from "./PromotionCard.module.scss";

type Props = {
  promotion: Promotion;
  userId: string;
  userPoints: number;
  setUser: Dispatch<SetStateAction<User>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function PromotionCard({
  promotion,
  userId,
  setUser,
  setError,
  userPoints,
}: Props) {
  const onSubmitPromotion = async () => {
    try {
      const postConsumption = await axios.put(
        `http://localhost:3000/api/user/${userId}`,
        {
          userId,
          promotionId: promotion.id,
          points: promotion.points,
          quantity: 1,
        }
      );

      await axios.post(`http://localhost:3000/api/socket/exchangePromotion`);

      if (postConsumption.data.message === "success") {
        updateUserState(userId, setUser);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message);
      }
    }
  };

  const isDisabled = !(userPoints - promotion.points >= 0);

  return (
    <div className={s.card_container}>
      <p className={s.name}>{promotion.name}</p>
      <div className={s.flex}>
        <p>
          Descuento: <strong>{promotion.discount}%</strong>
        </p>
        <p>
          <strong>-{promotion.points}pts</strong>
        </p>
      </div>
      <ul className={s.consumptions}>
        {promotion.consumptions.map((c) => (
          <li key={c.consumptionId}>{c.consumption.name}</li>
        ))}
      </ul>
      <button
        className={isDisabled ? s.disabled : ""}
        disabled={isDisabled}
        onClick={onSubmitPromotion}
      >
        CARGAR
      </button>
    </div>
  );
}

import axios, { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Promotion, User } from "../../../types/model";
import { updateUserState } from "../../../utils/userID";
import s from "./PromotionCard.module.scss";

type Props = {
  promotion: Promotion;
  userId: string;
  setUser: Dispatch<SetStateAction<User>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function PromotionCard({
  promotion,
  userId,
  setUser,
  setError,
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
      <div className={s.consumtpions}>
        {promotion.consumptions.map((c) => (
          <p key={c.consumptionId}>{c.consumption.name}</p>
        ))}
      </div>
      <button onClick={onSubmitPromotion}>CARGAR</button>
    </div>
  );
}

import axios from "axios";
import { SetStateAction } from "react";
import { Promotion, User } from "../../../types/model";
import { updateUserState } from "../../../utils/userID";
import s from "./PromotionCard.module.scss";

type Props = {
  promotion: Promotion;
  userId: string;
  setUser: React.Dispatch<SetStateAction<User>>;
};

export default function PromotionCard({ promotion, userId, setUser }: Props) {
  const onSubmitPromotion = async () => {
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
        <p>
          {promotion.consumptions.map((c) => (
            <p>{c.consumption.name}</p>
          ))}
        </p>
      </div>
      <button onClick={onSubmitPromotion}>CARGAR</button>
    </div>
  );
}

import axios from "axios";
import { SetStateAction, useState } from "react";
import { Consumption, User } from "../../../types/model";
import { updateUserState } from "../../../utils/userID";

import s from "./ConsumptionCard.module.scss";

type Props = {
  consumption: Consumption;
  name?: string;
  userId: string;
  setUser: React.Dispatch<SetStateAction<User>>;
};

export default function ConsumptionCard({
  consumption,
  name,
  userId,
  setUser,
}: Props) {
  const onSubmitConsumption = async () => {
    const postConsumption = await axios.put(
      `http://localhost:3000/api/user/${userId}`,
      {
        userId,
        consumptionId: consumption.id,
        points: consumption.points,
        operation: "addPoints",
        consumptionType: name,
        quantity: 1,
      }
    );

    await axios.post(`http://localhost:3000/api/socket/postConsumption`, {
      consumptionType: name,
    });

    if (postConsumption.data.message === "success") {
      updateUserState(userId, setUser);
    }
  };

  return (
    <div className={s.card_container}>
      <div>
        <p>{consumption.name}</p>
        <p>{consumption.points} pts</p>
      </div>
      <button onClick={onSubmitConsumption}>CARGAR</button>
    </div>
  );
}

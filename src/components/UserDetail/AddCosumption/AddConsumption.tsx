import axios from "axios";
import { SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../UI/Button/Button";

import { Consumption, User } from "../../../types/model";

import s from "./AddConsumption.module.scss";
import { updateUserState } from "../../../utils/userID";

type Props = {
  consumptions?: Consumption[];
  name: string;
  userId: string;
  setUser: React.Dispatch<SetStateAction<User>>;
};

type FormData = {
  id: string;
};

export default function AddConsumption({
  consumptions,
  name,
  userId,
  setUser,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
  } = useForm<FormData>();

  const onSubmitConsumption: SubmitHandler<FormData> = async (data) => {
    const consumptionId = data.id.split("-")[0];
    const consumptionPoints = data.id.split("-")[1];

    const postConsumption = await axios.put(
      `http://localhost:3000/api/user/${userId}`,
      {
        userId,
        consumptionId,
        points: consumptionPoints,
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
    <form onSubmit={handleSubmit(onSubmitConsumption)} className={s.form}>
      {/* <label>{name}:</label> */}
      <select {...register("id")}>
        {consumptions &&
          consumptions?.length > 0 &&
          consumptions.map((consumption) => (
            <option
              key={consumption.id}
              value={`${consumption.id}-${consumption.points}`}
            >
              {consumption.name} +{consumption.points} pts
            </option>
          ))}
      </select>

      <Button type="primary" operation="submit">
        CARGAR
      </Button>
    </form>
  );
}

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { Consumption } from "../../../../types/model";

import s from ".AddConsumption.module.scss";

type Props = {
  consumptions: Consumption[];
  name: string;
  userId: string;
};

type FormData = {
  id: string;
};

export default function AddConsumption({ consumptions, name, userId }: Props) {
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
        consumptionType: name === "Juego" ? "GAME" : "DRINK",
        quantity: 1,
      }
    );

    await axios.post(`http://localhost:3000/api/socket/postConsumption`, {
      consumptionType: name === "Juego" ? "GAME" : "DRINK",
    });

    if (postConsumption.data.message === "success") {
      console.log("success");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitConsumption)}>
      <label>{name}:</label>
      <select {...register("id")}>
        {consumptions?.length > 0 &&
          consumptions.map((consumption) => (
            <option
              key={consumption.id}
              value={`${consumption.id}-${consumption.points}`}
            >
              {consumption.name}
            </option>
          ))}
      </select>

      <button type="submit">CARGAR</button>
    </form>
  );
}

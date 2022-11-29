import { ConsumptionType } from "@prisma/client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import s from "./CreateConsumption.module.scss";

export default function CreateConsumption() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  type FormData = {
    name: string;
    type: ConsumptionType;
    points: number;
  };

  const onSubmitConsumption: SubmitHandler<FormData> = async (data) => {
    const postConsumption = await axios.post(
      `http://localhost:3000/api/consumption`,
      data
    );

    if (postConsumption.data.message) {
      console.log(postConsumption.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitConsumption)} className={s.form}>
      <h4>CREAR CONSUMICION</h4>
      <label>Tipo:</label>
      <select {...register("type")}>
        <option value="DRINK">Bebida</option>
        <option value="GAME">Juego</option>
      </select>
      <label>Nombre:</label>
      <input type="text" {...register("name")} />
      <label>Puntos:</label>
      <input type="text" {...register("points")} />
      <button type="submit">CREAR</button>
    </form>
  );
}
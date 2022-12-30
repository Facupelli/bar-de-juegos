import { ConsumptionType } from "@prisma/client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchConsumptions } from "../../../utils/fetching";

import Button from "../../UI/Button/Button";

import { Consumption } from "../../../types/model";

import s from "./CreateConsumption.module.scss";

type Props = {
  setConsumptionsList: React.Dispatch<
    React.SetStateAction<{
      drinks: Consumption[];
      games: Consumption[];
      foods: Consumption[];
    }>
  >;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  consumption?: Consumption;
};

type FormData = {
  name: string;
  type: ConsumptionType;
  points: number;
};

export default function CreateConsumption({
  setConsumptionsList,
  setOpenCreateModal,
  consumption,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: consumption?.type,
      name: consumption?.name,
      points: consumption?.points,
    },
  });

  const onSubmitConsumption: SubmitHandler<FormData> = async (data) => {
    let postConsumption;
    if (consumption) {
      postConsumption = await axios.put(
        `http://localhost:3000/api/consumption`,
        data
      );
    } else {
      postConsumption = await axios.post(
        `http://localhost:3000/api/consumption`,
        data
      );
    }

    if (postConsumption.data.message) {
      console.log(postConsumption.data.message);
      setConsumptionsList(await fetchConsumptions());
      setOpenCreateModal(false);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitConsumption)}
      className={`${s.flex_column} ${s.gap}`}
    >
      <h3>CREAR CONSUMICIÓN</h3>

      <div className={s.flex_column}>
        <label>Tipo:</label>
        <select {...register("type")}>
          <option value="DRINK">Bebida</option>
          <option value="FOOD">Comida</option>
          <option value="GAME">Juego</option>
        </select>
      </div>

      <div className={s.flex_column}>
        <label>Nombre:</label>
        <input type="text" {...register("name")} />
      </div>

      <div className={s.flex_column}>
        <label>Puntos:</label>
        <input type="text" {...register("points")} />
      </div>

      <Button type="primary" operation="submit">
        {consumption ? "CREAR" : "MODIFICAR"}
      </Button>
    </form>
  );
}

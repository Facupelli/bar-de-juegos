import { ConsumptionType } from "@prisma/client";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchConsumptions } from "../../../utils/fetching";

import Button from "../../UI/Button/Button";

import { Consumption } from "../../../types/model";

import s from "./CreateConsumption.module.scss";
import { useEffect } from "react";

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
  type?: {
    drinks: boolean;
    games: boolean;
    food: boolean;
  };
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
  type,
}: Props) {
  const getDefaultType = (
    type:
      | {
          drinks: boolean;
          games: boolean;
          food: boolean;
        }
      | undefined
  ) => {
    if (type?.drinks) return "DRINK";
    if (type?.games) return "GAME";
    if (type?.food) return "FOOD";
  };

  console.log(consumption);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: getDefaultType(type),
      name: consumption?.name,
      points: consumption?.points,
    },
  });

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

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
        {consumption ? "MODIFICAR" : "CREAR"}
      </Button>
    </form>
  );
}

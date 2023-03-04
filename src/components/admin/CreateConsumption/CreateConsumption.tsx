import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchConsumptions } from "../../../utils/fetching";

import Button from "../../UI/Button/Button";

import { Consumption, ConsumptionCategory } from "../../../types/model";

import s from "./CreateConsumption.module.scss";
import { useEffect } from "react";

type Props = {
  setConsumptionsList: React.Dispatch<ConsumptionCategory[]>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  consumption?: Consumption;
  categoryId?: string;
  consumptionCategories: { name: string; id: string }[];
};

type FormData = {
  name: string;
  categoryId: string;
  points: number;
};

export default function CreateConsumption({
  setConsumptionsList,
  setOpenCreateModal,
  consumption,
  categoryId,
  consumptionCategories,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      categoryId,
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

    if (postConsumption.data.message === "success") {
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
        <select {...register("categoryId")}>
          {consumptionCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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

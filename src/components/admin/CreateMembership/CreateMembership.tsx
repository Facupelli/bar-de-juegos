import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import s from "./CreateMembership.module.scss";

export default function CreateMembership() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MembershipData>();

  type MembershipData = {
    name: string;
    minPoints: number;
  };

  const onSubmitMembership: SubmitHandler<MembershipData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/membership",
      data
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitMembership)}
      className={`${s.flex_column} ${s.gap}`}
    >
      <h4>CREAR MEMBRESIA</h4>

      <div className={s.flex_column}>
        <label>Nombre:</label>
        <input type="text" {...register("name")} />
      </div>

      <div className={s.flex_column}>
        <label>Puntos Minimos:</label>
        <input type="text" {...register("minPoints")} />
      </div>

      <button>CREAR</button>
    </form>
  );
}

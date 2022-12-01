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
    <form onSubmit={handleSubmit(onSubmitMembership)} className={s.form}>
      <h4>CREAR MEMBRESIA</h4>
      <label>Nombre:</label>
      <input type="text" {...register("name")} />
      <label>Puntos Minimos:</label>
      <input type="text" {...register("minPoints")} />
      <button>CREAR</button>
    </form>
  );
}

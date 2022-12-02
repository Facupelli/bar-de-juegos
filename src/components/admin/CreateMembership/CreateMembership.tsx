import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchMemberships } from "../../../utils/fetching";

import { Membership } from "../../../types/model";

import s from "./CreateMembership.module.scss";

type Props = {
  setMembershipsList: React.Dispatch<React.SetStateAction<Membership[]>>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type MembershipData = {
  name: string;
  minPoints: number;
};

export default function CreateMembership({
  setMembershipsList,
  setOpenCreateModal,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MembershipData>();

  const onSubmitMembership: SubmitHandler<MembershipData> = async (data) => {
    const postMembership = await axios.post(
      "http://localhost:3000/api/membership",
      data
    );

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
      setMembershipsList(await fetchMemberships());
      setOpenCreateModal(false);
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

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchMemberships } from "../../../utils/fetching";

import { Membership } from "../../../types/model";

import s from "./CreateMembership.module.scss";
import Button from "../../UI/Button/Button";

type Props = {
  setMembershipsList: React.Dispatch<React.SetStateAction<Membership[]>>;
  setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
  membership?: Membership;
};

type MembershipData = {
  name: string;
  minPoints: number;
  maxPoints: number;
};

export default function CreateMembership({
  setMembershipsList,
  setOpenCreateModal,
  membership,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<MembershipData>({
    defaultValues: {
      name: membership?.name,
      minPoints: membership?.minPoints,
      maxPoints: membership?.maxPoints,
    },
  });

  const onSubmitMembership: SubmitHandler<MembershipData> = async (data) => {
    let postMembership;
    if (membership) {
      postMembership = await axios.put(
        "http://localhost:3000/api/membership",
        data
      );
    } else {
      postMembership = await axios.post(
        "http://localhost:3000/api/membership",
        data
      );
    }

    if (postMembership.data.message) {
      console.log(postMembership.data.message);
      setMembershipsList(await fetchMemberships());
      setOpenCreateModal(false);
      reset();
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

      <div className={s.flex_column}>
        <label>Puntos Máximos:</label>
        <input type="text" {...register("maxPoints")} />
      </div>

      <Button type="primary" operation="submit">
        CREAR
      </Button>
    </form>
  );
}

import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

export default function CreateMembership() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MembershipData>();

  type MembershipData = {
    name: string;
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
    <form onSubmit={handleSubmit(onSubmitMembership)}>
      <h4>CREAR MEMBRESIA</h4>
      <label>Nombre:</label>
      <input type="text" {...register("name")} />
      <button>CREAR</button>
    </form>
  );
}

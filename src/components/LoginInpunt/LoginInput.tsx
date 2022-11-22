import { useForm } from "react-hook-form";

import s from "./LoginInput.module.scss";

type SubmitData = {
  id: string;
};

export default function LoginInput() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: SubmitData) => {
    console.log(data);
  };

  const id = watch("id");

  if (id.length === 9) {
    onSubmit(id);
  }

  return (
    <section>
      <input type="text" {...register("id")} />
    </section>
  );
}

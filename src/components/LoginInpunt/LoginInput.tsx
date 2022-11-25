import { useRouter } from "next/router";
import { useEffect } from "react";
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
    setFocus,
  } = useForm();
  const router = useRouter();

  const id = watch("id");

  const onSubmit = async (id: string) => {
    router.push(`/user/${id}`);
  };

  if (id?.length === 25) {
    onSubmit(id);
  }

  useEffect(() => {
    setFocus("id");
  }, [setFocus]);

  return (
    <section className={s.section}>
      <input type="password" {...register("id")} autoFocus />
    </section>
  );
}
